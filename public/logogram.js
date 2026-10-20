/*
  Amtsweg logogram: a circular ink mark, one brush stroke per step.
  Each stroke is a filled shape with a heavy, loaded start and a dry end that splits into bristle
  tails, on its own arc and radius, with a little loose splatter near where the brush landed.
  A displacement filter roughens the edges. The same seed always draws the same mark, and each
  step keeps its own place on the ring. Not yet done = the same shape as a pale ghost.
  STAND-IN: this is generated. The plan is to replace the stroke shapes with traced scans of
  real brush strokes.
*/
(function(root){
  function rng(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const f = v => v.toFixed(1);
  const pt = (a, r) => [Math.cos(a) * r, Math.sin(a) * r];

  // Seeded shuffle of ring slots, so done strokes never bunch into one "spinner head"
  function slots(n, seed){
    const r = rng(seed * 13 + n), order = [...Array(n).keys()];
    for(let i = n - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    return order;
  }

  function stroke(i, n, seed, opts){
    opts = opts || {};
    const slot = slots(n, seed)[i];
    const r = rng(seed * 97 + i * 31 + 7);
    const span = (Math.PI * 2 / n) * (0.62 + r() * 0.55);            // unequal arcs, some overlap
    const a0 = (slot / n) * Math.PI * 2 - Math.PI / 2 + (r() - 0.5) * 0.18;
    const a1 = a0 + span;
    const R = 61 + r() * 15;                                         // different radii
    const w = (8 + r() * 8) * (opts.weight || 1);
    const drift = (r() - 0.5) * 7, steps = 34, dryAt = 0.66 + r() * 0.12;
    const centre = u => R + drift * Math.sin(Math.PI * u) + (r() - 0.5) * 0.25;
    // thickness: loaded start, steady body, thinning dry end
    const thick = u => w * Math.pow(Math.min(1, u * 5), 0.5) * (1 - 0.55 * Math.pow(u, 1.6)) + 0.4;
    const outer = [], inner = [];
    for(let k = 0; k <= steps; k++){
      const u = (k / steps) * dryAt, a = a0 + span * u, c = centre(u), t = thick(u);
      outer.push(pt(a, c + t / 2)); inner.push(pt(a, c - t / 2));
    }
    let d = 'M' + outer.map(p => f(p[0]) + ' ' + f(p[1])).join('L') + 'L' + inner.reverse().map(p => f(p[0]) + ' ' + f(p[1])).join('L') + 'Z';
    // the dry end splits into bristle tails of different lengths
    const tails = opts.plain ? 2 : 3 + Math.floor(r() * 2), tw = thick(dryAt);
    for(let b = 0; b < tails; b++){
      const off = (b / (tails - 1) - 0.5) * tw * 0.9, len = (1 - dryAt) * (0.45 + r() * 0.55);
      const bw = Math.max(0.5, tw / (tails * 1.25));
      const pts = [];
      for(let k = 0; k <= 8; k++){ const u = dryAt + len * (k / 8), a = a0 + span * u; pts.push([a, centre(u) + off * (1 - 0.4 * k / 8), bw * (1 - k / 8.6)]); }
      const o = pts.map(([a, c, t]) => pt(a, c + t / 2)), q = pts.map(([a, c, t]) => pt(a, c - t / 2)).reverse();
      d += 'M' + o.map(p => f(p[0]) + ' ' + f(p[1])).join('L') + 'L' + q.map(p => f(p[0]) + ' ' + f(p[1])).join('L') + 'Z';
    }
    // loose splatter where the brush landed
    if(!opts.plain){
      const drops = 1 + Math.floor(r() * 3);
      for(let k = 0; k < drops; k++){
        const a = a0 - 0.02 + r() * 0.12, rr = R + (r() - 0.5) * w * 2.6, dr = 0.6 + r() * 1.6, [x, y] = pt(a, rr);
        d += `M${f(x + dr)} ${f(y)}a${f(dr)} ${f(dr)} 0 1 0 ${f(-2 * dr)} 0a${f(dr)} ${f(dr)} 0 1 0 ${f(2 * dr)} 0Z`;
      }
    }
    const [sx, sy] = pt(a0, R), [ex, ey] = pt(a1, R);
    return { d, guide: `M${f(sx)} ${f(sy)}A${f(R)} ${f(R)} 0 0 1 ${f(ex)} ${f(ey)}`, w };
  }

  let uid = 0;
  // opts: n, done (array or count), color, ghost (colour of not-yet-done strokes; omitted = not drawn),
  // seed, fresh (index whose ink draws on), plain (no splatter), weight, label
  function svg(opts){
    const n = opts.n, seed = opts.seed || 1, id = 'ink' + (++uid);
    const isDone = i => Array.isArray(opts.done) ? !!opts.done[i] : i < (opts.done || 0);
    let body = '', defs = '';
    for(let i = 0; i < n; i++){
      const s = stroke(i, n, seed, opts);
      if(isDone(i)){
        if(opts.fresh === i){
          defs += `<mask id="${id}m${i}" maskUnits="userSpaceOnUse" x="-100" y="-100" width="200" height="200"><path class="ink-draw" d="${s.guide}" pathLength="1" fill="none" stroke="#fff" stroke-width="${f(s.w * 3.4)}" stroke-linecap="round"/></mask>`;
          body += `<path d="${s.d}" fill="${opts.color}" mask="url(#${id}m${i})"/>`;
        } else body += `<path d="${s.d}" fill="${opts.color}"/>`;
      } else if(opts.ghost){
        body += `<path d="${s.d}" fill="${opts.ghost}"/>`;
      }
    }
    const a11y = opts.label ? `role="img" aria-label="${opts.label}"` : 'aria-hidden="true" focusable="false"';
    return `<svg class="logogram" viewBox="-100 -100 200 200" ${a11y}><defs><filter id="${id}" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="${opts.rough || 4.2}" xChannelSelector="R" yChannelSelector="G"/></filter>${defs}</defs><g filter="url(#${id})">${body}</g></svg>`;
  }

  // A single stroke on its own, cropped to its shape: each step's piece of the mark
  function strokeSvg(i, n, opts){
    const st = stroke(i, n, opts.seed || 1, opts), nums = st.d.match(/-?\d+(\.\d+)?/g).map(Number);
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for(let k = 0; k + 1 < nums.length; k += 2){ const x = nums[k], y = nums[k + 1]; if(Math.abs(x) > 100 || Math.abs(y) > 100) continue; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const pad = 4, w = x1 - x0 + pad * 2, h = y1 - y0 + pad * 2, size = Math.max(w, h);
    const vx = x0 - pad - (size - w) / 2, vy = y0 - pad - (size - h) / 2, id = 'inks' + (++uid);
    return `<svg class="logogram-stroke" viewBox="${f(vx)} ${f(vy)} ${f(size)} ${f(size)}" aria-hidden="true" focusable="false"><defs><filter id="${id}" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="${opts.seed || 1}"/><feDisplacementMap in="SourceGraphic" scale="${opts.rough || 3}" xChannelSelector="R" yChannelSelector="G"/></filter></defs><path filter="url(#${id})" d="${st.d}" fill="currentColor"/></svg>`;
  }

  const api = { svg, stroke, strokeSvg };
  if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.Logogram = api;
})(typeof window !== 'undefined' ? window : this);
