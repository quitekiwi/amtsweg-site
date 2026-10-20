/*
  Amtsweg — Berlin content pack.

  Everything a reader sees lives here; engine.js only knows how to show it.
  Every fact was checked against the source named on its step.

  How a field can be written:
    "plain text"                         same for everyone
    "text with {cityName}"               {cityName} etc. come from `vars` below; {verified} and
                                         {<question>Short} (the chosen option's `short`, or its label) are built in
    { by: "visaType", "work,family": "…", default: "…" }  differs per answer; comma = several answers share it
  flag / notes: highlighted notes under the facts (text or a list). A variant's `flag` replaces the
  base flag; `notes` on the base step always show too.
  A step can also carry `variants` (same `by` idea) whose fields replace the base ones —
  except `discrepancy`, which is shown in addition to the step's own.

  short:   one plain sentence: what you do. Shown first when a step opens. Only checked facts.
  deadline: a short deadline or fine (only those: the dusk colour means deadline), shown as a tag on the closed step and as the first fact.
  discrepancy.rely: one line on what to rely on, specific to that disagreement.
  source:  the main official source (shown as "Confirmed against …"). null = "Not yet checked".
  also:    extra official links shown under it (a list of keys from `sources`, or a { by } field).
  checked: the date this step was last checked against its sources.

  Source tiers for disagreements: "official", "legal" (immigration guide), "aggregator".

  Only one city so far, so there is no city question: add one (and `by: "city"` fields)
  when Munich or Frankfurt are added.
*/
window.PACK = {
  id: "berlin",
  verified: "19 Oct 2026",   // default "checked" date; a step can override it with its own `checked`

  page: {
    title: "Amtsweg — Berlin paperwork, step by step",
    description: "The paperwork for moving to Berlin, step by step, in the order you'll do it, with an official source for every step.",
    meta: "Berlin · in English · an independent guide, not a government website",
    heading: "Amtsweg",
    sub: "The paperwork for moving to Berlin, in the order you'll actually do it, with sources so you can check everything yourself.",
    button: "Show my steps",
    footer: "Every step links the official source it was checked against, with the date. Where sources disagree, all claims are shown, the official one first. Rules change: the LEA and your Bürgeramt have the final word."
  },

  questions: [
    {
      id: "citizenship",
      label: "You are",
      options: [
        { val: "eu", label: "EU / EEA citizen", small: "No visa needed · Freizügigkeit (free movement)" },
        { val: "noneu", label: "Non-EU citizen", small: "Visa, then a residence permit · Aufenthaltstitel" }
      ]
    },
    {
      id: "visaType",
      label: "You're coming to",
      showIf: { citizenship: "noneu" },
      options: [
        { val: "work", label: "Work", small: "A job offer, including the EU Blue Card · Fachkraft / Blaue Karte EU", short: "work" },
        { val: "family", label: "Join your spouse", small: "Your husband, wife or partner lives in Germany · Ehegattennachzug", short: "joining a spouse" },
        { val: "study", label: "Study", small: "A place at a university or a preparatory course · Studium", short: "study" },
        { val: "chancenkarte", label: "Look for work", small: "Up to a year to find a job · Chancenkarte (Opportunity Card)", short: "Chancenkarte" }
      ]
    }
  ],

  // Summary under "Your steps", e.g. "Non-EU · work · Berlin"
  dossierTitle: {
    by: "citizenship",
    eu: "EU / EEA citizen · {cityName}",
    noneu: "Non-EU · {visaTypeShort} · {cityName}"
  },

  vars: {
    cityName: "Berlin"
  },

  sources: {
    // Visa
    diplo: { name: "Auswärtiges Amt — Consular Services Portal (visa applications)", url: "https://digital.diplo.de/visa" },
    diploChancenkarte: { name: "Auswärtiges Amt — Opportunity Card visa", url: "https://digital.diplo.de/chancenkarte" },
    diploStudium: { name: "Auswärtiges Amt — visa for study", url: "https://digital.diplo.de/studium" },
    diploEhegatten: { name: "Auswärtiges Amt — visa for joining a spouse", url: "https://digital.diplo.de/ehegattennachzug" },
    diploBlueCard: { name: "Auswärtiges Amt — EU Blue Card visa", url: "https://digital.diplo.de/blaue-karte" },
    mignBlueCard: { name: "Make it in Germany — EU Blue Card (2026 salary thresholds)", url: "https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card" },
    aufenthv41: { name: "Residence Regulation §41 — who may enter without a visa (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/aufenthv/__41.html" },
    aufenthv46: { name: "Residence Regulation §46 — visa fees (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/aufenthv/__46.html" },
    aufenthg30: { name: "Residence Act §30 — joining a spouse (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__30.html" },

    // Registration
    bmg17: { name: "Federal Registration Act §17 — two weeks to register (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/bmg/__17.html" },
    bmg19: { name: "Federal Registration Act §19 — the landlord's confirmation (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/bmg/__19.html" },
    bmg54: { name: "Federal Registration Act §54 — fines (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/bmg/__54.html" },
    anmeldung: { name: "Service Berlin — registering your address (Anmeldung)", url: "https://service.berlin.de/dienstleistung/120686/" },
    buergeramtNews: { name: "berlin.de — Bürgeramt appointments within 14 days (15 May 2026)", url: "https://www.berlin.de/aktuelles/10383346-958090-buergeramttermine-innerhalb-von-14-tagen.html" },

    // Health insurance
    vvg193: { name: "Insurance Contract Act §193 — health insurance is compulsory (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/vvg_2008/__193.html" },
    bmgGkv: { name: "Federal Ministry of Health — who is insured in statutory health insurance", url: "https://www.bundesgesundheitsministerium.de/gesetzlich-versicherte" },
    mignChancenkarteBrochure: { name: "Make it in Germany — First steps with the Opportunity Card (PDF)", url: "https://www.make-it-in-germany.com/fileadmin/1_Rebrush_2022/a_Fachkraefte/PDF-Dateien/3_Visum_u_Aufenthalt/Visagrafik_EN/Broschuere_Chancenkarte_EN.pdf" },
    sgb5_175: { name: "Social Code V §175 — choosing your Krankenkasse (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/sgb_5/__175.html" },
    freizuegg4: { name: "Free Movement Act/EU §4 — EU citizens who don't work (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/freiz_gg_eu_2004/__4.html" },
    freizuegg2: { name: "Free Movement Act/EU §2 — the right to live in Germany (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/freiz_gg_eu_2004/__2.html" },

    // Money
    bafinBasiskonto: { name: "BaFin — the basic account (Basiskonto)", url: "https://www.bafin.de/DE/Verbraucher/Bank/Produkte/Basiskonto/basiskonto_node.html" },
    zkg31: { name: "Payment Accounts Act §31 — right to a basic account (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/zkg/__31.html" },
    bzstFaq: { name: "Bundeszentralamt für Steuern — questions about the tax ID", url: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/FAQ/faq_node.html" },
    bzstIdnr: { name: "Bundeszentralamt für Steuern — request your tax ID again", url: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer_node.html" },
    rundfunk: { name: "Rundfunkbeitrag — the broadcasting fee", url: "https://www.rundfunkbeitrag.de/" },
    rundfunkMythen: { name: "Rundfunkbeitrag — no TV? You still pay (1 Jul 2026)", url: "https://www.rundfunkbeitrag.de/presse-und-aktuelles/servicethemen/beitragsmythen-teil-2-wenn-ich-keinen-fernseher-habe-kann-ich-den-rundfunkbeitrag-abmelden-oder" },
    rundfunkInfo: { name: "Rundfunkbeitrag — information for residents", url: "https://www.rundfunkbeitrag.de/buergerinnen-und-buerger/informationen" },
    rundfunkAnmelden: { name: "Rundfunkbeitrag — register your flat", url: "https://www.rundfunkbeitrag.de/buergerinnen-und-buerger/formulare/anmelden" },

    // Residence permit (LEA)
    leaOnline: { name: "LEA Berlin — which applications are online", url: "https://www.berlin.de/einwanderung/termine/unsere-dienstleistungen/artikel.873508.php" },
    leaWork: { name: "LEA Berlin — skilled workers and the EU Blue Card", url: "https://www.berlin.de/einwanderung/aufenthalt/erwerbstaetigkeit/artikel.874035.php" },
    serviceBlueCard: { name: "Service Berlin — EU Blue Card", url: "https://service.berlin.de/dienstleistung/324659/" },
    serviceSkilled: { name: "Service Berlin — skilled worker with a degree", url: "https://service.berlin.de/dienstleistung/329328/" },
    serviceStudy: { name: "Service Berlin — residence permit for study", url: "https://service.berlin.de/dienstleistung/305244/" },
    serviceSpouse: { name: "Service Berlin — residence permit for the spouse of a foreign national", url: "https://service.berlin.de/dienstleistung/305289/en/" },
    serviceChancenkarte: { name: "Service Berlin — Chancenkarte", url: "https://service.berlin.de/dienstleistung/354301/" },
    leaPhotos: { name: "LEA Berlin — digital passport photos (from 14 July 2025)", url: "https://www.berlin.de/einwanderung/ueber-uns/aktuelles/artikel.1541531.php" },
    aufenthg81: { name: "Residence Act §81 — what your application does while you wait (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__81.html" },
    aufenthg18c: { name: "Residence Act §18c — permanent residence for Blue Card holders (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__18c.html" },
    aufenthv45: { name: "Residence Regulation §45 — residence permit fees (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/aufenthv/__45.html" },
    leaEat: { name: "LEA Berlin — the electronic residence permit (eAT)", url: "https://www.berlin.de/einwanderung/aufenthalt/elektronischer-aufenthaltstitel/" },
    pwEat: { name: "Personalausweisportal — the eAT's online ID and PIN letter", url: "https://www.personalausweisportal.de/Webs/PA/DE/buergerinnen-und-buerger/elektronischer-aufenthaltstitel/elektronischer-aufenthaltstitel-node.html" },

    // After
    bamfKurs: { name: "BAMF — integration course: who takes part and what it costs", url: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/TeilnahmeKosten/Titelab2005/titelab2005.html" },
    aufenthg43: { name: "Residence Act §43 — what the integration course covers (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__43.html" },
    aufenthg44: { name: "Residence Act §44 — who is entitled to an integration course (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__44.html" },
    aufenthg44a: { name: "Residence Act §44a — who must take one (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__44a.html" },
    bundid: { name: "Personalausweisportal — the BundID account", url: "https://www.personalausweisportal.de/Webs/PA/DE/buergerinnen-und-buerger/die_bund-id/die_bund_id-node.html" }
  },

  // Which steps, in which order, for which answers. First match wins.
  paths: [
    { when: { citizenship: "eu" }, steps: ["housing", "anmeldung_eu", "health_eu", "bank", "steuerid", "rundfunk", "bundid_eu"] },
    { when: { citizenship: "noneu", visaType: ["work", "family"] }, steps: ["visa", "health_noneu", "housing", "anmeldung_noneu", "bank", "steuerid", "permit", "eat", "rundfunk", "integration"] },
    { when: { citizenship: "noneu" }, steps: ["visa", "health_noneu", "housing", "anmeldung_noneu", "bank", "steuerid", "permit", "eat", "rundfunk"] }
  ],

  steps: {

    /* ---------- Shared steps ---------- */

    housing: {
      title: "A flat, and the Wohnungs\u00ADgeber\u00ADbestätigung",
      meta: "From your landlord, when you move in",
      short: "Find a flat, and ask your landlord for the Wohnungsgeberbestätigung: a short form saying you moved in. You need it to register your address.",
      deadline: "Within 2 weeks of moving in",
      what: "Before you can register your address, you need a flat and a Wohnungsgeberbestätigung: a short form in which your landlord (Wohnungsgeber) confirms that you moved in. The law requires the landlord to give it to you. Berlin says plainly that a rental contract does not replace it.",
      where: "Your landlord, or the person they authorise, fills it in. The Wohnungsgeber doesn't have to be the owner: if they aren't, the form also names the owner.",
      docs: "The form must show the landlord's name and address (and the owner's name, if that's someone else), your move-in date, the flat's address, and the names of everyone moving in.",
      cost: "No office fee. It's a form your landlord fills in.",
      time: "Your landlord must confirm within the two weeks you have to register. If they refuse, or it doesn't arrive in time, tell the Bürgeramt straight away (§19 para. 2).",
      source: "bmg19",
      also: ["anmeldung", "bmg54"],
      flag: "Landlords who refuse to confirm, or confirm late, can be fined up to €1,000. Offering an address for a registration where nobody actually lives can be fined up to €50,000 (§54 Federal Registration Act)."
    },

    bank: {
      title: "Bank account",
      meta: "Any bank — the basic account is a legal right",
      short: "Open a bank account. Every bank must offer you a basic account (Basiskonto), and you don't need to be registered first.",
      what: "You'll need a German or EU bank account for salary, rent and the fees on the next steps. By law, every consumer who lives legally in the EU has the right to a basic account (Basiskonto), even without a fixed address. A normal account is the bank's choice; the Basiskonto isn't.",
      where: "Any bank that offers accounts to consumers must offer you a Basiskonto. Ask for it by name if a bank turns you down.",
      docs: "A valid photo ID: your passport works. BaFin says a Fiktionsbescheinigung (the paper certificate the LEA can give you while your permit is pending) is not enough on its own as ID. Banks may ask for your home address; BaFin says you don't need to be registered (Anmeldung) for a Basiskonto.",
      cost: "Banks may charge only reasonable fees for a Basiskonto (§41 Payment Accounts Act, per BaFin).",
      time: "Once your application form is complete, the bank must offer the Basiskonto within ten business days.",
      source: "bafinBasiskonto",
      also: ["zkg31"],
      discrepancy: {
        label: "Do you need your Anmeldung first?",
        rely: "For a Basiskonto, no: that's the law (BaFin). For a normal account the bank decides, so ask what it needs before you apply.",
        claims: [
          { text: "BaFin: for a Basiskonto, 'Ein Wohnsitz im Sinne des Meldegesetzes ist nicht erforderlich': a registered address is not required.", tier: "official" },
          { text: "All About Berlin (updated 11 Sep 2026): traditional banks want your passport 'and sometimes your Anmeldebestätigung', and some ask for your tax ID. Online banks often open accounts by video call without it.", tier: "legal" }
        ]
      }
    },

    steuerid: {
      title: "Steuer-ID (tax ID) arrives by post",
      meta: "Bundeszentralamt für Steuern — automatic after your Anmeldung",
      short: "Nothing to apply for: your tax ID comes by post after you register your address. Put your surname on your mailbox.",
      what: "Your Steuerliche Identifikationsnummer (IdNr, usually called the Steuer-ID) is your tax ID, and it stays the same for life, even when you move. It's linked to the wage-tax data (Lohnsteuerabzugsmerkmale) your employer uses. You don't apply for it: after your Anmeldung, the Bürgeramt passes your data to the Bundeszentralamt für Steuern (BZSt), which sends the number by letter.",
      where: "It comes by post to your registered address. Your surname must be on the mailbox, or the letter can't be delivered.",
      docs: "Nothing to send at first. If nothing has arrived three months after you registered, send the BZSt a copy of your ID document and your Meldebestätigung (the registration certificate). You can also ask for the number to be sent again with the BZSt's online form.",
      cost: "The BZSt describes no fee.",
      time: "The BZSt gives no fixed time. It sends the letter once the Bürgeramt has passed on your data. Act after three months.",
      source: "bzstFaq",
      also: ["bzstIdnr"],
      flag: "The BZSt won't give your tax ID by phone or email, for data-protection reasons. Watch your mailbox."
    },

    rundfunk: {
      title: "Rundfunk\u00ADbeitrag (broadcasting fee)",
      meta: "Beitragsservice — one fee per flat",
      short: "Register your flat for the broadcasting fee: €18.36 a month, one fee per flat, TV or not.",
      deadline: "When you move in",
      what: "Every flat in Germany must be registered for the Rundfunkbeitrag, which funds public TV and radio. It doesn't matter whether you have a TV, radio, phone or computer, or whether you use them. It's charged per flat (Wohnung), not per person: when several people live together, only one of them pays.",
      where: "Online on rundfunkbeitrag.de, with the 'Wohnung anmelden' form. Flatmates decide among themselves who registers the flat.",
      docs: "Nothing to bring. It's an online form.",
      cost: "€18.36 a month per flat, normally billed every three months (€55.08).",
      time: "Register when you move in, unless someone in your flat already pays.",
      source: "rundfunkInfo",
      also: ["rundfunk", "rundfunkMythen", "rundfunkAnmelden"],
      flag: "Not having a TV is not a reason to be exempt. Exemptions exist for some people on social benefits, and you have to apply for them."
    },

    /* ---------- EU / EEA path ---------- */

    anmeldung_eu: {
      title: "Anmeldung (registering your address)",
      meta: "Bürgeramt or online",
      short: "Register your address within 14 days of moving in, online or at a Bürgeramt. It's free.",
      deadline: "Within 14 days of moving in · fine up to €1,000",
      what: "Everyone who moves into a flat in Germany must register the address within two weeks (§17 Federal Registration Act). You get a Meldebestätigung, the registration certificate. You'll need it for the tax ID, for many banks and contracts, and as proof that you live in Berlin.",
      where: "Online, if you are 18 or older, are a German or EU citizen, and have a BundID account, an ID card with the online function (eID) and its PIN, and the AusweisApp. Otherwise, in person at any Berlin Bürgeramt with an appointment, booked on service.berlin.de.",
      docs: "The registration form (or the online application), your passport or ID card, and the Wohnungsgeberbestätigung from your landlord. A rental contract doesn't replace it. For a first registration in Berlin, civil-status documents such as a marriage or birth certificate may be needed.",
      cost: "Free.",
      time: "In person, you get the Meldebestätigung on the spot. Online, it's made available digitally after the office has checked your application.",
      source: "anmeldung",
      also: ["bmg17", "bmg54", "buergeramtNews"],
      discrepancy: {
        label: "Does the 14-day deadline matter?",
        rely: "The law sets two weeks. Book your Bürgeramt appointment as soon as you know your move-in date.",
        claims: [
          { text: "The law sets two weeks (§17 Federal Registration Act), and registering late can be fined up to €1,000 (§54).", tier: "official" },
          { text: "All About Berlin (updated 11 Sep 2026) says you have 14 days 'but in Berlin nobody cares', and that you can register months later.", tier: "legal" }
        ]
      }
    },

    health_eu: {
      title: "Health insurance",
      meta: "Through your job, or your own cover",
      short: "Have health insurance from your first day. With a job, you choose a Krankenkasse and tell your employer.",
      deadline: "From your first day living here",
      what: "Everyone who lives in Germany must have health insurance (§193 Insurance Contract Act). If you work for an employer and earn more than €603 a month but less than €77,400 a year (2026), you are compulsorily insured in statutory health insurance (gesetzliche Krankenversicherung, GKV). You choose a Krankenkasse and tell your employer which one within two weeks of starting; if you don't, your employer chooses one for you (§175 Social Code V). If you don't work, EU law lets you live in Germany only if you have adequate health insurance and enough money to live on (§4 Free Movement Act/EU).",
      where: "A Krankenkasse of your choice (statutory), or a private insurer if you're above the income limit or self-employed.",
      docs: "Your ID and address. With a job, tell your employer which Krankenkasse you've chosen.",
      cost: "Statutory contributions are a share of your salary. Students up to age 30 pay a reduced €87.38 a month plus their Krankenkasse's own add-on (Federal Ministry of Health, Stand 3 Sep 2026).",
      time: "From your first day of living here. With private insurance, taking out cover more than a month late costs a one-off surcharge: one monthly premium for each started month without cover, and a sixth of a premium per month after the fifth (§193 para. 4).",
      source: "bmgGkv",
      also: ["sgb5_175", "vvg193", "freizuegg4", "freizuegg2"],
      flag: "We haven't yet checked an official page on using your home country's European Health Insurance Card (EHIC) while you live here. Ask your Krankenkasse or your home insurer."
    },

    bundid_eu: {
      title: "BundID (your account for online services)",
      meta: "id.bund.de — optional, but saves trips",
      short: "Optional: create a BundID account so you can do German paperwork online.",
      what: "BundID is the federal citizens' account for doing paperwork online. It pre-fills forms and has a mailbox for official decisions. Berlin's online Anmeldung uses it, as do services such as BAföG and the Federal Employment Agency's eServices.",
      where: "Online at id.bund.de. For the highest security level, sign up with the online ID function of your ID card (EU eID card or a European ID), the free AusweisApp and your PIN. A username and password with two-factor login also works, but not for every service.",
      docs: "Your ID card with the online function and its PIN, and a phone with NFC or a card reader.",
      cost: "Free.",
      time: "A few minutes once you have your card's PIN.",
      source: "bundid"
    },

    /* ---------- Non-EU path ---------- */

    visa: {
      title: "National visa (before you travel)",
      meta: "The German embassy or consulate where you live",
      short: { by: "visaType", work: "Apply for your work visa (or EU Blue Card) at the German embassy where you live, before you travel. It costs €75.", family: "Apply for a spouse visa at the German embassy where you live. You usually need basic German (A1).", study: "Apply for a student visa with your admission letter and proof of €992 a month.", chancenkarte: "Apply for the Chancenkarte visa with proof of €1,091 a month. You need the visa even if you can normally travel visa-free." },
      what: {
        by: "visaType",
        work: "You need a national visa (Visum, category D) for work before you travel. There are two main routes: the EU Blue Card (Blaue Karte EU, §18g) for people with a degree and a well-paid job, and the skilled-worker permits for people with a recognised degree (§18b) or vocational training (§18a).",
        family: "You need a national visa (category D) to join your spouse or registered partner in Germany (Ehegattennachzug, §30 Residence Act). Both of you must be at least 18, and the marriage or partnership must already exist (or, if you're engaged, the marriage registration must be confirmed).",
        study: "You need a national visa (category D) for study. It also covers preparatory steps such as a required language course or a Studienkolleg (preparatory college).",
        chancenkarte: "The Chancenkarte (Opportunity Card, §20a) lets you come to Germany for up to a year to look for a job. You need the visa first, even if your nationality can normally enter Germany without one: Berlin's LEA can't issue a Chancenkarte after a visa-free entry."
      },
      where: "The German mission (embassy or consulate) responsible for where you live. Many visas can be applied for online on the Foreign Office's Consular Services Portal: you upload your documents, the mission checks them, then you attend an appointment for fingerprints and a photo. Online applications are for one person only; family members apply at the mission.",
      docs: {
        by: "visaType",
        work: "A job offer or contract, your degree or vocational qualification (recognised in Germany, or rated comparable), and the documents your mission's checklist asks for. For the Blue Card, the job must last at least six months and match your qualification.",
        family: "Proof of marriage or registered partnership, your spouse's German residence permit (or their visa or visa application, if they haven't moved yet), and proof of basic German at level A1, usually a recognised language certificate. Your mission's checklist has the rest.",
        study: "Your admission letter (or acceptance at a preparatory college), proof of language skills for your course, and proof that you can live on at least €992 a month, for example a blocked account (Sperrkonto) of €11,904 for the year, a declaration of commitment (Verpflichtungserklärung) or a scholarship.",
        chancenkarte: "Either a degree or vocational qualification recognised in Germany (then no points needed), or at least 6 points on the points system with a degree or 2+ years of vocational training recognised where you got it, plus German at A1 or English at B2. Proof of at least €1,091 a month, for example a blocked account."
      },
      cost: "€75 for a national (D) visa (§46 Residence Regulation). Some missions work with service providers that charge an extra service fee.",
      time: "The portal doesn't give a standard processing time; it depends on the mission.",
      source: { by: "visaType", work: "mignBlueCard", family: "diploEhegatten", study: "diploStudium", chancenkarte: "diploChancenkarte" },
      also: { by: "visaType", work: ["diploBlueCard", "diplo", "aufenthv46", "aufenthv41"], family: ["aufenthg30", "diplo", "aufenthv46", "aufenthv41"], study: ["diplo", "aufenthv46", "aufenthv41"], chancenkarte: ["diplo", "aufenthv46"] },
      notes: {
        by: "visaType",
        work: [
          "EU Blue Card salary thresholds for 2026: at least €50,700 gross a year, or €45,934.20 for shortage occupations, for people whose last degree is less than three years old, and for IT specialists without a degree (with at least 3 years in IT in the last 7). At the lower threshold, the Federal Employment Agency (BA) must approve.",
          "Citizens of Australia, Israel, Japan, Canada, South Korea, New Zealand, the USA and the UK may enter without a visa and apply for their permit in Germany within 90 days of arriving (§41 Residence Regulation). Ask the LEA before you start work."
        ],
        family: [
          "The A1 German rule doesn't apply if your spouse holds an EU Blue Card or a skilled-worker permit (§18a/§18b and some others), or if your spouse's nationality may enter Germany without a visa for long stays (§30 para. 1). There are also exceptions for illness or disability.",
          "Citizens of Australia, Israel, Japan, Canada, South Korea, New Zealand, the USA and the UK may enter without a visa and apply in Germany within 90 days of arriving (§41 Residence Regulation)."
        ],
        study: [
          "Citizens of Australia, Israel, Japan, Canada, South Korea, New Zealand, the USA and the UK may enter without a visa and apply in Germany within 90 days of arriving (§41 Residence Regulation).",
          "No admission yet? A separate visa to look for a university place lets you stay up to nine months. It needs €1,091 a month."
        ],
        chancenkarte: "With the Chancenkarte you may work up to 20 hours a week, and do trial jobs of up to two weeks each. Once you have a job offer for qualified work, you can switch to a work permit or a follow-up Chancenkarte at the LEA."
      }
    },

    health_noneu: {
      title: "Health insurance",
      meta: { by: "visaType", work: "Usually through your job", family: "For you and your spouse", study: "Student insurance", chancenkarte: "Your own cover from day one" },
      short: { by: "visaType", work: "Have German health insurance from day one. With a job, you choose a Krankenkasse and tell your employer.", family: "Get German health insurance for you and your spouse. Foreign insurance usually isn't accepted.", study: "Get German student health insurance: €87.38 a month plus your Krankenkasse's add-on.", chancenkarte: "Get private health insurance that is valid in Germany. Switch to a Krankenkasse once you have a job." },
      deadline: "From your first day in Germany",
      what: {
        by: "visaType",
        work: "Everyone who lives in Germany must have health insurance (§193 Insurance Contract Act). As an employee earning more than €603 a month but less than €77,400 a year (2026), you are compulsorily insured in statutory health insurance (gesetzliche Krankenversicherung, GKV). You choose a Krankenkasse and tell your employer which one within two weeks of starting; if you don't, your employer chooses one for you (§175 Social Code V). If you earn above the limit, you can stay in GKV voluntarily or switch to private insurance.",
        family: "Everyone who lives in Germany must have health insurance (§193 Insurance Contract Act). For your residence permit, the LEA wants proof of health insurance for both of you, and says that foreign insurance is generally not enough.",
        study: "Everyone who lives in Germany must have health insurance (§193 Insurance Contract Act). Students are compulsorily insured in statutory health insurance (GKV) up to age 30, at a reduced student rate. The LEA wants German insurance for your permit: 'Eine ausländische Krankenversicherung genügt grundsätzlich nicht' (foreign insurance is generally not enough).",
        chancenkarte: "Everyone who lives in Germany must have health insurance (§193 Insurance Contract Act), and the Chancenkarte requires it. The official Opportunity Card brochure says you can first take out private health insurance that is valid in Germany, and switch to statutory insurance (GKV) once you have a job that pays social-security contributions."
      },
      where: "A statutory Krankenkasse of your choice, or a private insurer. For private insurance, the LEA asks for a certificate under §257 para. 2a SGB V showing what it covers and costs.",
      docs: "Your passport and visa. For the LEA you'll later need a copy of both sides of your health card, or a current confirmation from the Krankenkasse (statutory), or the §257 certificate (private).",
      cost: {
        by: "visaType",
        study: "€87.38 a month plus your Krankenkasse's own add-on (Federal Ministry of Health, Stand 3 Sep 2026).",
        default: "Statutory contributions are a share of your income. Private premiums depend on the insurer and the plan."
      },
      time: "From your first day in Germany. With private insurance, taking out cover more than a month late costs a one-off surcharge: one monthly premium for each started month without cover, and a sixth of a premium per month after the fifth (§193 para. 4).",
      source: { by: "visaType", chancenkarte: "mignChancenkarteBrochure", default: "bmgGkv" },
      also: { by: "visaType", work: ["sgb5_175", "vvg193", "serviceSkilled"], family: ["vvg193", "serviceSpouse"], study: ["vvg193", "serviceStudy"], chancenkarte: ["vvg193", "bmgGkv", "serviceChancenkarte"] },
      flag: "Your visa mission may also ask for travel health insurance for your first weeks, until German cover starts. We haven't checked each mission's rule yet; look at your mission's checklist."
    },

    anmeldung_noneu: {
      title: "Anmeldung (registering your address)",
      meta: "Bürgeramt, in person, by appointment",
      short: "Book a Bürgeramt appointment and register your address within 14 days of moving in. It's free.",
      deadline: "Within 14 days of moving in · fine up to €1,000",
      what: "Everyone who moves into a flat in Germany must register the address within two weeks (§17 Federal Registration Act). You get a Meldebestätigung, the registration certificate. You need it for your tax ID and as proof of address for your residence permit.",
      where: "In person at any Berlin Bürgeramt, with an appointment booked on service.berlin.de. Berlin's online registration is only for German and EU citizens, and doesn't work with an eAT.",
      docs: "The registration form, your passport (with your visa), and the Wohnungsgeberbestätigung from your landlord. A rental contract doesn't replace it. For a first registration in Berlin, civil-status documents such as a marriage or birth certificate may be needed.",
      cost: "Free.",
      time: "You get the Meldebestätigung on the spot, once your documents are checked.",
      source: "anmeldung",
      also: ["bmg17", "bmg54", "buergeramtNews"],
      discrepancy: {
        label: "Can you get an appointment in time?",
        rely: "Berlin's own figures say appointments within 14 days are available now. If none show up, look again later: new slots appear during the day.",
        claims: [
          { text: "berlin.de (15 May 2026): in March 2026, for the first time, everyone who wanted a Bürgeramt appointment within 14 days got one. The rate was 48.5% in March 2023, 58.2% in 2024 and 74.0% in 2025.", tier: "official" },
          { text: "All About Berlin (updated 11 Sep 2026): 'If you can't find an appointment, try again later. New appointments appear during working hours, mostly in the morning.'", tier: "legal" }
        ]
      },
      notes: "The law sets two weeks, and registering late can be fined up to €1,000 (§54). Some guides say nobody checks in Berlin, but your residence permit application asks for proof of address, so register promptly."
    },

    permit: {
      title: "Residence permit (Aufenthalts\u00ADtitel) at the LEA",
      meta: "Landesamt für Einwanderung — online application",
      short: "Apply online at the LEA before your visa runs out. Save the confirmation PDF: it keeps you legal while you wait.",
      deadline: "Before your visa expires (up to 4 months ahead)",
      what: "Your visa only gets you started. To stay, you apply for a residence permit (Aufenthaltstitel) at Berlin's immigration office, the Landesamt für Einwanderung (LEA). In Berlin you apply online. After you pay and send the application, you get a confirmation PDF. It certifies that your current visa stays valid past its expiry date while the LEA decides (a legal effect called Fiktionswirkung, §81 para. 4 Residence Act). Save and print it.",
      where: "Online through Service Berlin. Upload your documents (PDF, JPG or PNG, up to 7 MB each and 100 MB in total) and pay the fee by credit card or PayPal before you submit. The LEA checks the application, may ask for more documents, then invites you to an appointment. Bring the originals.",
      docs: "Colour copies of your passport (the data page, plus your entry stamp and visa), proof of address (Meldebestätigung, or rental contract plus Wohnungsgeberbestätigung), your rental contract and proof of your current warm rent, and proof of German health insurance. The documents for your route are listed below.",
      cost: "First permit: €100 as a plastic card (eAT), or €56 as a sticker in your passport. Extensions: €93 (eAT) or €49 (sticker). Paid online when you apply, and generally not refunded once processing has started.",
      time: "You can apply up to 4 months before your visa runs out, and you must apply before it expires. The confirmation PDF doesn't help if your visa had already expired, or if you entered on a Schengen (C) visa.",
      source: "leaOnline",
      also: ["aufenthg81", "aufenthv45", "leaPhotos"],
      notes: "Don't bring paper passport photos to the LEA. Since 14 July 2025 it uses digital photos only: have one taken at a photo studio or drugstore that uploads it to the LEA's photo cloud and gives you a QR code, or use the PointID machine at the office (€6).",
      discrepancy: {
        label: "How long it takes",
        rely: "No official processing time exists. Apply as early as you're allowed (up to 4 months before your visa ends): the confirmation PDF keeps your current visa valid while you wait.",
        claims: [
          { text: "Service Berlin's permit pages give no overall processing time. After a positive check you get an appointment; a sticker can be issued there, and the plastic card (eAT) takes 4–6 weeks.", tier: "official" },
          { text: "All About Berlin (updated 11 Sep 2026): 'It takes 3 to 6 months, but they approve 99% of applications'; the appointment 'might be months later'.", tier: "legal" }
        ]
      },
      variants: {
        by: "visaType",
        work: {
          meta: "LEA Business Immigration Service — online application",
          where: "Online through Service Berlin. For work permits, Berlin says to use only the online application. Skilled workers and Blue Card holders are handled by the LEA's Business Immigration Service at Keplerstraße 2, 10589 Berlin-Charlottenburg. Pay online, save the confirmation PDF, then wait for your appointment and bring the originals.",
          docs: "On top of the documents above: your employment contract or job offer; the 'Erklärung zum Beschäftigungsverhältnis' form, filled in and signed by your employer; your degree (with its anabin rating, or a ZAB statement of comparability if it isn't rated); and a professional licence if your job needs one. If you're 45 or older, adequate pension provision is generally required: for 2026, gross pay of at least €4,647.50 a month unless you can show other provision.",
          source: "serviceBlueCard",
          also: ["serviceSkilled", "leaWork", "aufenthg81", "aufenthg18c", "leaPhotos"],
          flag: "At your first appointment the LEA normally gives you a certificate that lets you start work straight away, without waiting for the plastic card (eAT). The Blue Card runs for your contract plus 6 months, up to 4 years. Change jobs in your first year? Tell the LEA.",
          discrepancy: {
            label: "When Blue Card holders can get permanent residence",
        rely: "The law is what counts: 27 months, or 21 with sufficient German. The LEA's overview page looks out of date.",
            claims: [
              { text: "The law (§18c para. 2 Residence Act): after 27 months of Blue Card work with basic German, or 21 months with sufficient German.", tier: "official" },
              { text: "Make it in Germany (federal portal): 27 months with German at A1, 21 months with B1.", tier: "official" },
              { text: "The LEA's own Blue Card overview page still says 33 months, or 21 with sufficient German. This looks out of date.", tier: "official" }
            ]
          }
        },
        family: {
          meta: "LEA — online application (since 23 March 2026)",
          docs: "On top of the documents above: a copy of your spouse's passport; your marriage certificate (foreign certificates need a certified translation and possibly an apostille or legalisation); proof of basic German, generally A1 (unless an exception applies); your family's income (employment contract, the last 6 months of net pay and an employer statement no older than 14 days); and proof of health insurance for both of you. You and your spouse attend the appointment together.",
          cost: "First permit: €100 as a plastic card (eAT), or €56 as a sticker. Extensions: €93 or €49. No fee if you can't cover your living costs without benefits (SGB II/XII or AsylbLG), with a current official notice as proof.",
          time: "Apply before your visa runs out. After the appointment, the plastic card takes at least 4 weeks to be ready.",
          source: "serviceSpouse",
          also: ["aufenthg30", "aufenthg81", "leaPhotos"],
          flag: "If your spouse is applying for their own work or study permit in Berlin at the same time, they can add you to their online application instead, and the LEA will contact you about your permit."
        },
        study: {
          meta: "LEA — online application",
          docs: "On top of the documents above: your enrolment certificate (or conditional admission) and proof of money: €992 a month (€11,904 a year) for 2026, through a blocked account, a declaration of commitment (Verpflichtungserklärung), a scholarship, a notarised parental declaration with their last 6 months of income, or a job contract. Your main home must be in Berlin; a second home there isn't enough.",
          source: "serviceStudy",
          also: ["aufenthg81", "leaPhotos"],
          flag: "The permit is usually issued for two years. You can work 140 full days a year (days of up to 4 hours count as half), and student jobs at your university (studentische Nebentätigkeiten) don't count towards that.",
          discrepancy: {
            label: "Can you be self-employed while you study?",
        rely: "The LEA decides your permit in Berlin, and it allows self-employment on the side. Check the conditions on your permit's Zusatzblatt before you start.",
            claims: [
              { text: "LEA Berlin (Service Berlin study page): self-employment is allowed as a side activity, as long as it doesn't put your studies at risk.", tier: "official" },
              { text: "Auswärtiges Amt (visa for study page): 'Self-employed activities are not permitted.'", tier: "official" }
            ]
          }
        },
        chancenkarte: {
          meta: "LEA — online application",
          docs: "On top of the documents above: a copy of your national D visa for job-seeking (or your current work permit or Blue Card), and proof that you can cover your living costs (rent, food, clothing and health insurance), for example a bank statement, income certificates or a scholarship letter.",
          cost: "€100 as a plastic card (eAT) or €56 as a sticker if you entered on a national D visa. €98 or €54 if you're switching from another work permit.",
          source: "serviceChancenkarte",
          also: ["aufenthg81", "leaPhotos"],
          flag: "The Chancenkarte is usually issued for one year. Berlin can't issue it after a visa-free entry. You can switch to another permit once you meet its requirements."
        }
      }
    },

    eat: {
      title: "Collect your eAT (residence card)",
      meta: "LEA — a second visit",
      short: "Go back to the LEA to pick up your residence card (eAT). Keep the PIN letter you got at the first visit.",
      what: "The electronic residence permit (elektronischer Aufenthaltstitel, eAT) is a plastic card with a chip, made by the Bundesdruckerei (federal printing office). That's why it normally takes two visits: one for your fingerprints, signature and photo, and one to collect the card.",
      where: "At the LEA, when you're told the card is ready.",
      docs: "Your passport. At the first visit you get a PIN letter: keep it safe. It has a five-digit transport PIN and a PUK, which you need to switch on the card's online ID function.",
      cost: "Included in the permit fee.",
      time: "Service Berlin says the card takes 4 to 6 weeks to be ready (at least 4 weeks after the appointment for family permits).",
      source: "leaEat",
      also: ["pwEat"],
      flag: "The eAT isn't ID on its own: show it with your passport and the Zusatzblatt, the extra sheet with your conditions (for example, limits on work). The card itself is valid for up to 10 years, and your permit has its own end date, which can differ from the card's; check both. The eAT's online ID works with BundID for German online services."
    },

    integration: {
      title: "Integrations\u00ADkurs (integration course)",
      meta: "BAMF — the LEA decides if it's compulsory",
      short: "If the LEA tells you to, take the integration course: German plus an orientation course. It costs €2.29 an hour, and you can get half back.",
      deadline: "Your right to a place lapses after 1 year",
      what: "The integration course is a German language course plus an orientation course on Germany's legal system, culture and history (§43 Residence Act); the general course is 700 hours. If you get a first residence permit for work or to join your spouse, and you'll live here long term, you're entitled to a place. You may be obliged to attend if you can't yet get by in simple German; for spouses, if your German isn't yet 'sufficient'. The LEA decides whether you're obliged when it issues your permit.",
      where: "The LEA gives you a Berechtigungsschein (certificate of eligibility). You then choose an integration course provider (Integrationskursträger), hand in the certificate there and sign up.",
      docs: "Your Berechtigungsschein and your residence permit.",
      cost: "€2.29 per teaching hour: €1,603 for the standard 700-hour course, paid before each 100-hour block. You can apply to get half back if you pass the final test within two years of receiving your eligibility. People on benefits or low incomes can apply to be exempt (BAMF, Stand 1 Jul 2026).",
      time: "Your right to a place lapses one year after your permit is issued (§44 para. 2), so don't wait too long.",
      source: "bamfKurs",
      also: ["aufenthg43", "aufenthg44", "aufenthg44a"],
      notes: "You're not obliged if you're in training or education in Germany, or if attending is permanently impossible or unreasonable. People who already speak enough German aren't entitled to the full course, but can still join the orientation part."
    }
  }
};
