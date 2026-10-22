/*
  Amtsweg mark: a spiral into the centre. Every step is a dot on a regular (Archimedean) spiral;
  the dots step around the centre in equal turns and shrink as they get closer to it. The centre
  point is arriving. Used for the header mark, the progress mark (done = filled, to come = ring),
  the per-step dot in the list, and the favicon.
  The API keeps the names the page already uses: Logogram.svg(opts) and Logogram.strokeSvg(i, n, opts).
*/
(function(root){
  const f = v => v.toFixed(2);
  const TURNS = 2, R = 82;

  // The spiral line, sampled from the outside (12 o'clock) inwards, clockwise, centred on its box
  function geometry(){
    const theta1 = TURNS * Math.PI * 2, b = R / theta1, N = 900, pts = [];
    for(let k = 0; k <= N; k++){
      const th = theta1 * (1 - k / N), r = b * th, a = -Math.PI / 2 + (theta1 - th);
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    pts.forEach(([x, y])=>{ x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); });
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    return pts.map(([x, y])=>[x - cx, y - cy]);
  }
  const G = geometry();
  // dot k of n: equal turns around the centre, stopping short of the centre point
  const stop = (k, n)=>G[Math.round((G.length - 1) * 0.9 * (k / n))];
  const size = (k, n)=>8.4 - 4.2 * (k / Math.max(1, n - 1));
  const centre = G[G.length - 1];

  // opts: n, done (array or count), color, ghost (line and rings; defaults to a faint `color`),
  // fresh (index of a dot that has just been filled), lineWidth, label (accessible name)
  function svg(opts){
    const n = opts.n, color = opts.color, ghost = opts.ghost || color;
    const faint = opts.ghost ? '' : ' stroke-opacity=".35"';
    const isDone = i => Array.isArray(opts.done) ? !!opts.done[i] : i < (opts.done || 0);
    let h = `<path d="M${G.map(p=>f(p[0]) + ' ' + f(p[1])).join('L')}" fill="none" stroke="${ghost}"${faint} stroke-width="${opts.lineWidth || 1.2}" stroke-linecap="round"/>`;
    for(let k = 0; k < n; k++){
      const [x, y] = stop(k, n), r = size(k, n);
      h += isDone(k)
        ? `<circle class="spiral-dot${opts.fresh === k ? ' fresh' : ''}" cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${color}"/>`
        : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r - 0.8)}" fill="none" stroke="${ghost}"${faint} stroke-width="1.6"/>`;
    }
    h += `<circle cx="${f(centre[0])}" cy="${f(centre[1])}" r="3.4" fill="${color}"/>`;
    const a11y = opts.label ? `role="img" aria-label="${opts.label}"` : 'aria-hidden="true" focusable="false"';
    return `<svg class="logogram" viewBox="-100 -100 200 200" ${a11y}>${h}</svg>`;
  }

  // The list's per-step mark: one dot, coloured by the page (currentColor)
  function strokeSvg(){
    return `<svg class="logogram-stroke" viewBox="-10 -10 20 20" aria-hidden="true" focusable="false"><circle r="6.5" fill="currentColor"/></svg>`;
  }

  const api = { svg, strokeSvg };
  if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.Logogram = api;
})(typeof window !== 'undefined' ? window : this);
