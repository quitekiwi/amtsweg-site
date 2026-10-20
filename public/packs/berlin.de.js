/*
  Amtsweg — Berlin, German words.
  Same shape as packs/berlin.js, but only the words: facts, links, steps and logic live in berlin.js.
  engine.js lays this over the English pack when the page is shown in German.
  Every sentence must say the same as its English original (checked 20 Oct 2026; a native speaker
  should still proofread before launch).
*/
window.PACK_I18N = window.PACK_I18N || {};
window.PACK_I18N.de = {
  page: {
    title: "Amtsweg — Behördengänge in Berlin, Schritt für Schritt",
    description: "Die Formalitäten beim Umzug nach Berlin, Schritt für Schritt, in der Reihenfolge, in der Sie sie erledigen, mit einer offiziellen Quelle für jeden Schritt.",
    meta: "Berlin · auf Deutsch · ein unabhängiger Wegweiser, keine Behördenseite",
    sub: "Die Formalitäten beim Umzug nach Berlin, in der Reihenfolge, in der Sie sie wirklich erledigen, mit Quellen, damit Sie alles selbst prüfen können.",
    button: "Meine Schritte zeigen",
    footer: "Jeder Schritt verlinkt die offizielle Quelle, anhand der er geprüft wurde, mit Datum. Wo Quellen sich widersprechen, stehen alle Aussagen nebeneinander, die offizielle zuerst. Regeln ändern sich: Das LEA und Ihr Bürgeramt haben das letzte Wort."
  },

  questions: [
    {
      label: "Sie sind",
      options: [
        { label: "Aus der EU / dem EWR", small: "Kein Visum nötig · Freizügigkeit" },
        { label: "Aus einem Nicht-EU-Staat", small: "Visum, danach ein Aufenthaltstitel" }
      ]
    },
    {
      label: "Sie kommen für",
      options: [
        { label: "Arbeit", small: "Ein Jobangebot, auch mit Blauer Karte EU · Fachkraft", short: "Arbeit" },
        { label: "Ihren Ehepartner", small: "Ihr Ehe- oder Lebenspartner lebt in Deutschland · Ehegattennachzug", short: "Ehegattennachzug" },
        { label: "Ein Studium", small: "Ein Studienplatz oder ein Vorbereitungskurs · Studium", short: "Studium" },
        { label: "Die Jobsuche", small: "Bis zu ein Jahr Zeit, eine Stelle zu finden · Chancenkarte", short: "Chancenkarte" }
      ]
    }
  ],

  dossierTitle: {
    eu: "EU / EWR · {cityName}",
    noneu: "Nicht-EU · {visaTypeShort} · {cityName}"
  },

  sources: {
    diplo: { name: "Auswärtiges Amt — Auslandsportal (Visumanträge)" },
    diploChancenkarte: { name: "Auswärtiges Amt — Visum für die Chancenkarte" },
    diploStudium: { name: "Auswärtiges Amt — Visum zum Studium" },
    diploEhegatten: { name: "Auswärtiges Amt — Visum zum Ehegattennachzug" },
    diploBlueCard: { name: "Auswärtiges Amt — Visum für die Blaue Karte EU" },
    mignBlueCard: { name: "Make it in Germany — Blaue Karte EU (Gehaltsgrenzen 2026, englisch)" },
    aufenthv41: { name: "§ 41 Aufenthaltsverordnung — Einreise ohne Visum (gesetze-im-internet.de)" },
    aufenthv46: { name: "§ 46 Aufenthaltsverordnung — Gebühren für Visa (gesetze-im-internet.de)" },
    aufenthg30: { name: "§ 30 Aufenthaltsgesetz — Ehegattennachzug (gesetze-im-internet.de)" },
    bmg17: { name: "§ 17 Bundesmeldegesetz — zwei Wochen für die Anmeldung (gesetze-im-internet.de)" },
    bmg19: { name: "§ 19 Bundesmeldegesetz — Mitwirkung des Wohnungsgebers (gesetze-im-internet.de)" },
    bmg54: { name: "§ 54 Bundesmeldegesetz — Bußgelder (gesetze-im-internet.de)" },
    anmeldung: { name: "Service Berlin — Anmeldung einer Wohnung" },
    buergeramtNews: { name: "berlin.de — Bürgeramtstermine innerhalb von 14 Tagen (15. Mai 2026)" },
    vvg193: { name: "§ 193 Versicherungsvertragsgesetz — Pflicht zur Krankenversicherung (gesetze-im-internet.de)" },
    bmgGkv: { name: "Bundesministerium für Gesundheit — Versicherte in der gesetzlichen Krankenversicherung" },
    mignChancenkarteBrochure: { name: "Make it in Germany — Erste Schritte mit der Chancenkarte (PDF, englisch)" },
    sgb5_175: { name: "§ 175 SGB V — Wahl der Krankenkasse (gesetze-im-internet.de)" },
    freizuegg4: { name: "§ 4 Freizügigkeitsgesetz/EU — nicht erwerbstätige Unionsbürger (gesetze-im-internet.de)" },
    freizuegg2: { name: "§ 2 Freizügigkeitsgesetz/EU — Recht auf Einreise und Aufenthalt (gesetze-im-internet.de)" },
    bafinBasiskonto: { name: "BaFin — das Basiskonto" },
    zkg31: { name: "§ 31 Zahlungskontengesetz — Anspruch auf ein Basiskonto (gesetze-im-internet.de)" },
    bzstFaq: { name: "Bundeszentralamt für Steuern — Fragen zur Steuer-ID" },
    bzstIdnr: { name: "Bundeszentralamt für Steuern — Steuer-ID erneut anfordern" },
    rundfunk: { name: "Rundfunkbeitrag — Startseite" },
    rundfunkMythen: { name: "Rundfunkbeitrag — kein Fernseher? Der Beitrag gilt trotzdem (1. Juli 2026)" },
    rundfunkInfo: { name: "Rundfunkbeitrag — Informationen für Bürgerinnen und Bürger" },
    rundfunkAnmelden: { name: "Rundfunkbeitrag — Wohnung anmelden" },
    leaOnline: { name: "LEA Berlin — welche Anträge online möglich sind" },
    leaWork: { name: "LEA Berlin — Fachkräfte und Blaue Karte EU" },
    serviceBlueCard: { name: "Service Berlin — Blaue Karte EU" },
    serviceSkilled: { name: "Service Berlin — Fachkraft mit akademischer Ausbildung" },
    serviceStudy: { name: "Service Berlin — Aufenthaltserlaubnis zum Studium" },
    serviceSpouse: { name: "Service Berlin — Aufenthaltserlaubnis für Ehegatten von Ausländern (englische Seite)" },
    serviceChancenkarte: { name: "Service Berlin — Chancenkarte" },
    leaPhotos: { name: "LEA Berlin — digitale Passfotos (ab 14. Juli 2025)" },
    aufenthg81: { name: "§ 81 Aufenthaltsgesetz — was Ihr Antrag während der Wartezeit bewirkt (gesetze-im-internet.de)" },
    aufenthg18c: { name: "§ 18c Aufenthaltsgesetz — Niederlassungserlaubnis für Inhaber der Blauen Karte (gesetze-im-internet.de)" },
    aufenthv45: { name: "§ 45 Aufenthaltsverordnung — Gebühren für den Aufenthaltstitel (gesetze-im-internet.de)" },
    leaEat: { name: "LEA Berlin — der elektronische Aufenthaltstitel (eAT)" },
    pwEat: { name: "Personalausweisportal — Online-Ausweis und PIN-Brief des eAT" },
    bamfKurs: { name: "BAMF — Integrationskurs: Teilnahme und Kosten" },
    aufenthg43: { name: "§ 43 Aufenthaltsgesetz — Inhalt des Integrationskurses (gesetze-im-internet.de)" },
    aufenthg44: { name: "§ 44 Aufenthaltsgesetz — Anspruch auf einen Integrationskurs (gesetze-im-internet.de)" },
    aufenthg44a: { name: "§ 44a Aufenthaltsgesetz — Pflicht zur Teilnahme (gesetze-im-internet.de)" },
    bundid: { name: "Personalausweisportal — die BundID" }
  },

  steps: {
    housing: {
      title: "Wohnung und Wohnungs­geber­bestätigung",
      meta: "Von Ihrem Vermieter, beim Einzug",
      short: "Finden Sie eine Wohnung und lassen Sie sich vom Vermieter die Wohnungsgeberbestätigung geben: ein kurzes Formular, das Ihren Einzug bestätigt. Sie brauchen es für die Anmeldung.",
      deadline: "Innerhalb von 2 Wochen nach dem Einzug",
      what: "Bevor Sie Ihre Wohnung anmelden können, brauchen Sie eine Wohnung und eine Wohnungsgeberbestätigung: ein kurzes Formular, in dem der Wohnungsgeber bestätigt, dass Sie eingezogen sind. Der Vermieter ist gesetzlich verpflichtet, sie Ihnen zu geben. Berlin sagt klar: Ein Mietvertrag ersetzt sie nicht.",
      where: "Ihr Vermieter oder eine von ihm beauftragte Person füllt sie aus. Der Wohnungsgeber muss nicht der Eigentümer sein; ist er es nicht, nennt das Formular auch den Eigentümer.",
      docs: "Das Formular muss enthalten: Name und Anschrift des Wohnungsgebers (und den Namen des Eigentümers, falls das jemand anderes ist), Ihr Einzugsdatum, die Anschrift der Wohnung und die Namen aller, die einziehen.",
      cost: "Keine Behördengebühr. Es ist ein Formular, das Ihr Vermieter ausfüllt.",
      time: "Ihr Vermieter muss innerhalb der zwei Wochen bestätigen, die Sie für die Anmeldung haben. Verweigert er das oder kommt die Bestätigung nicht rechtzeitig, melden Sie das sofort dem Bürgeramt (§ 19 Abs. 2).",
      flag: "Vermieter, die die Bestätigung verweigern oder zu spät geben, können ein Bußgeld von bis zu 1.000 € bekommen. Wer eine Adresse für eine Anmeldung anbietet, obwohl dort niemand wohnt, riskiert bis zu 50.000 € (§ 54 Bundesmeldegesetz)."
    },

    bank: {
      title: "Bankkonto",
      meta: "Jede Bank — das Basiskonto ist ein gesetzlicher Anspruch",
      short: "Eröffnen Sie ein Bankkonto. Jede Bank muss Ihnen ein Basiskonto anbieten, und Sie müssen dafür noch nicht angemeldet sein.",
      what: "Sie brauchen ein deutsches oder EU-Bankkonto für Gehalt, Miete und die Gebühren der nächsten Schritte. Nach dem Gesetz hat jeder Verbraucher, der sich rechtmäßig in der EU aufhält, Anspruch auf ein Basiskonto, auch ohne festen Wohnsitz. Ein normales Konto ist Sache der Bank; das Basiskonto nicht.",
      where: "Jede Bank, die Konten für Verbraucher anbietet, muss Ihnen ein Basiskonto anbieten. Fragen Sie ausdrücklich danach, wenn eine Bank Sie ablehnt.",
      docs: "Ein gültiger Lichtbildausweis: Ihr Reisepass reicht. Laut BaFin genügt eine Fiktionsbescheinigung (die Papierbescheinigung des LEA während des Verfahrens) allein nicht als Ausweis. Banken dürfen nach Ihrer Wohnanschrift fragen; laut BaFin müssen Sie für ein Basiskonto nicht angemeldet sein.",
      cost: "Für ein Basiskonto dürfen Banken nur angemessene Entgelte verlangen (§ 41 Zahlungskontengesetz, laut BaFin).",
      time: "Sobald Ihr Antrag vollständig ist, muss die Bank das Basiskonto innerhalb von zehn Geschäftstagen anbieten.",
      discrepancy: {
        label: "Brauchen Sie zuerst die Anmeldung?",
        rely: "Für ein Basiskonto nein: So steht es im Gesetz (BaFin). Bei einem normalen Konto entscheidet die Bank; fragen Sie vorher, was sie verlangt.",
        claims: [
          { text: "BaFin: Für ein Basiskonto gilt: „Ein Wohnsitz im Sinne des Meldegesetzes ist nicht erforderlich.“" },
          { text: "All About Berlin (Stand 11. Sept. 2026, englischsprachig): Klassische Banken verlangen den Reisepass und manchmal die Anmeldebestätigung, manche auch die Steuer-ID. Onlinebanken eröffnen Konten oft per Videoanruf ohne Anmeldung." }
        ]
      }
    },

    steuerid: {
      title: "Steuer-ID kommt per Post",
      meta: "Bundeszentralamt für Steuern — automatisch nach Ihrer Anmeldung",
      short: "Kein Antrag nötig: Ihre Steuer-ID kommt per Post, nachdem Sie Ihre Wohnung angemeldet haben. Schreiben Sie Ihren Nachnamen an den Briefkasten.",
      what: "Ihre Steuerliche Identifikationsnummer (IdNr, meist Steuer-ID genannt) bleibt ein Leben lang gleich, auch bei einem Umzug. Mit ihr sind die Lohnsteuerabzugsmerkmale verknüpft, die Ihr Arbeitgeber nutzt. Sie beantragen sie nicht: Nach Ihrer Anmeldung übermittelt das Bürgeramt Ihre Daten an das Bundeszentralamt für Steuern (BZSt), das Ihnen die Nummer per Brief schickt.",
      where: "Sie kommt per Post an Ihre gemeldete Adresse. Ihr Nachname muss am Briefkasten stehen, sonst kann der Brief nicht zugestellt werden.",
      docs: "Zunächst nichts. Ist drei Monate nach der Anmeldung noch nichts angekommen, schicken Sie dem BZSt eine Kopie Ihres Ausweisdokuments und Ihrer Meldebestätigung. Sie können die Nummer auch mit dem Online-Formular des BZSt erneut anfordern.",
      cost: "Das BZSt nennt keine Gebühr.",
      time: "Das BZSt nennt keine feste Frist. Es verschickt den Brief, sobald das Bürgeramt Ihre Daten übermittelt hat. Nach drei Monaten sollten Sie nachhaken.",
      flag: "Aus Datenschutzgründen nennt das BZSt die Steuer-ID weder am Telefon noch per E-Mail. Achten Sie auf Ihren Briefkasten."
    },

    rundfunk: {
      title: "Rundfunk­beitrag",
      meta: "Beitragsservice — ein Beitrag pro Wohnung",
      short: "Melden Sie Ihre Wohnung beim Rundfunkbeitrag an: 18,36 € im Monat, ein Beitrag pro Wohnung, mit oder ohne Fernseher.",
      deadline: "Beim Einzug",
      what: "Jede Wohnung in Deutschland muss für den Rundfunkbeitrag angemeldet werden, der den öffentlich-rechtlichen Rundfunk finanziert. Ob Sie Fernseher, Radio, Handy oder Computer haben oder nutzen, spielt keine Rolle. Er wird pro Wohnung erhoben, nicht pro Person: Wohnen mehrere Personen zusammen, zahlt nur eine.",
      where: "Online auf rundfunkbeitrag.de mit dem Formular „Wohnung anmelden“. Wer in einer WG die Wohnung anmeldet, entscheiden Sie selbst.",
      docs: "Nichts mitzubringen. Es ist ein Online-Formular.",
      cost: "18,36 € im Monat pro Wohnung, normalerweise alle drei Monate abgebucht (55,08 €).",
      time: "Beim Einzug anmelden, es sei denn, jemand in Ihrer Wohnung zahlt bereits.",
      flag: "Kein Fernseher ist kein Grund für eine Befreiung. Befreiungen gibt es für manche Bezieher von Sozialleistungen, und Sie müssen sie beantragen."
    },

    anmeldung_eu: {
      title: "Anmeldung der Wohnung",
      meta: "Bürgeramt oder online",
      short: "Melden Sie Ihre Wohnung innerhalb von 14 Tagen nach dem Einzug an, online oder im Bürgeramt. Es ist kostenlos.",
      deadline: "Innerhalb von 14 Tagen nach dem Einzug · Bußgeld bis 1.000 €",
      what: "Wer in Deutschland eine Wohnung bezieht, muss sich innerhalb von zwei Wochen anmelden (§ 17 Bundesmeldegesetz). Sie bekommen eine Meldebestätigung. Sie brauchen sie für die Steuer-ID, bei vielen Banken und Verträgen und als Nachweis, dass Sie in Berlin wohnen.",
      where: "Online, wenn Sie mindestens 18 Jahre alt sind, die deutsche oder eine EU-Staatsangehörigkeit haben und ein BundID-Konto, einen Ausweis mit Online-Funktion (eID) samt PIN und die AusweisApp haben. Sonst persönlich in einem beliebigen Berliner Bürgeramt mit Termin, gebucht über service.berlin.de.",
      docs: "Das Anmeldeformular (oder der Online-Antrag), Ihr Reisepass oder Personalausweis und die Wohnungsgeberbestätigung Ihres Vermieters. Ein Mietvertrag ersetzt sie nicht. Bei der ersten Anmeldung in Berlin können Personenstandsurkunden wie Heirats- oder Geburtsurkunde nötig sein.",
      cost: "Kostenlos.",
      time: "Vor Ort bekommen Sie die Meldebestätigung sofort. Online wird sie digital bereitgestellt, nachdem die Behörde Ihren Antrag geprüft hat.",
      discrepancy: {
        label: "Ist die 14-Tage-Frist wichtig?",
        rely: "Das Gesetz sieht zwei Wochen vor. Buchen Sie Ihren Bürgeramtstermin, sobald Sie Ihr Einzugsdatum kennen.",
        claims: [
          { text: "Das Gesetz sieht zwei Wochen vor (§ 17 Bundesmeldegesetz), eine verspätete Anmeldung kann mit bis zu 1.000 € geahndet werden (§ 54)." },
          { text: "All About Berlin (Stand 11. Sept. 2026, englischsprachig): Man habe 14 Tage, aber in Berlin interessiere das niemand, und man könne sich auch Monate später anmelden." }
        ]
      }
    },

    health_eu: {
      title: "Kranken­versicherung",
      meta: "Über Ihre Arbeit oder eigene Versicherung",
      short: "Sie müssen ab dem ersten Tag krankenversichert sein. Mit einer Stelle wählen Sie eine Krankenkasse und sagen Ihrem Arbeitgeber Bescheid.",
      deadline: "Ab dem ersten Tag, an dem Sie hier wohnen",
      what: "Wer in Deutschland wohnt, muss krankenversichert sein (§ 193 Versicherungsvertragsgesetz). Wenn Sie angestellt sind und mehr als 603 € im Monat, aber weniger als 77.400 € im Jahr verdienen (2026), sind Sie in der gesetzlichen Krankenversicherung (GKV) pflichtversichert. Sie wählen eine Krankenkasse und teilen sie Ihrem Arbeitgeber innerhalb von zwei Wochen nach Beginn mit; sonst wählt der Arbeitgeber eine für Sie (§ 175 SGB V). Wenn Sie nicht arbeiten, dürfen Sie nach EU-Recht nur in Deutschland leben, wenn Sie ausreichend krankenversichert sind und genug Geld zum Leben haben (§ 4 Freizügigkeitsgesetz/EU).",
      where: "Eine Krankenkasse Ihrer Wahl (gesetzlich) oder eine private Versicherung, wenn Sie über der Einkommensgrenze liegen oder selbstständig sind.",
      docs: "Ausweis und Adresse. Mit einer Stelle sagen Sie Ihrem Arbeitgeber, welche Krankenkasse Sie gewählt haben.",
      cost: "Gesetzliche Beiträge sind ein Anteil Ihres Gehalts. Studierende bis 30 Jahre zahlen ermäßigt 87,38 € im Monat plus den Zusatzbeitrag ihrer Krankenkasse (Bundesministerium für Gesundheit, Stand 3. Sept. 2026).",
      time: "Ab dem ersten Tag, an dem Sie hier wohnen. Bei privater Versicherung kostet ein Abschluss mehr als einen Monat zu spät einen einmaligen Zuschlag: ein Monatsbeitrag für jeden angefangenen Monat ohne Versicherung, ab dem sechsten Monat ein Sechstel davon pro Monat (§ 193 Abs. 4).",
      flag: "Eine offizielle Seite zur Nutzung der Europäischen Krankenversicherungskarte (EHIC) Ihres Heimatlandes, während Sie hier wohnen, haben wir noch nicht geprüft. Fragen Sie Ihre Krankenkasse oder Ihre Versicherung im Heimatland."
    },

    bundid_eu: {
      title: "BundID (Ihr Konto für Online-Dienste)",
      meta: "id.bund.de — freiwillig, spart aber Wege",
      short: "Freiwillig: Legen Sie ein BundID-Konto an, um Behördengänge online zu erledigen.",
      what: "Die BundID ist das Bürgerkonto des Bundes für Online-Behördengänge. Es füllt Formulare vor und hat ein Postfach für Bescheide. Berlins Online-Anmeldung nutzt sie, ebenso Dienste wie BAföG und die eServices der Bundesagentur für Arbeit.",
      where: "Online auf id.bund.de. Für die höchste Sicherheitsstufe registrieren Sie sich mit der Online-Funktion Ihres Ausweises (eID-Karte für EU-Bürger oder eine europäische ID), der kostenlosen AusweisApp und Ihrer PIN. Benutzername und Passwort mit Zwei-Faktor-Anmeldung gehen auch, aber nicht für jeden Dienst.",
      docs: "Ihr Ausweis mit Online-Funktion samt PIN und ein Handy mit NFC oder ein Kartenleser.",
      cost: "Kostenlos.",
      time: "Wenige Minuten, sobald Sie die PIN Ihres Ausweises haben."
    },

    visa: {
      title: "Nationales Visum (vor der Einreise)",
      meta: "Die deutsche Botschaft oder das Konsulat an Ihrem Wohnort",
      short: { work: "Beantragen Sie Ihr Arbeitsvisum (oder die Blaue Karte EU) vor der Einreise bei der deutschen Botschaft an Ihrem Wohnort. Es kostet 75 €.", family: "Beantragen Sie ein Visum zum Ehegattennachzug bei der deutschen Botschaft an Ihrem Wohnort. Meist brauchen Sie einfache Deutschkenntnisse (A1).", study: "Beantragen Sie ein Studienvisum mit Ihrer Zulassung und dem Nachweis über 992 € im Monat.", chancenkarte: "Beantragen Sie das Visum für die Chancenkarte mit dem Nachweis über 1.091 € im Monat. Sie brauchen das Visum auch, wenn Sie sonst ohne Visum einreisen dürfen." },
      what: {
        work: "Sie brauchen vor der Einreise ein nationales Visum (Kategorie D) zur Arbeit. Es gibt zwei Hauptwege: die Blaue Karte EU (§ 18g) für Menschen mit Studienabschluss und gut bezahlter Stelle, und die Aufenthaltserlaubnis für Fachkräfte mit anerkanntem Studium (§ 18b) oder anerkannter Berufsausbildung (§ 18a).",
        family: "Sie brauchen ein nationales Visum (Kategorie D), um zu Ihrem Ehe- oder eingetragenen Lebenspartner nach Deutschland zu ziehen (Ehegattennachzug, § 30 Aufenthaltsgesetz). Beide müssen mindestens 18 Jahre alt sein, und die Ehe oder Partnerschaft muss bereits bestehen (bei Verlobten muss die Anmeldung zur Eheschließung bestätigt sein).",
        study: "Sie brauchen ein nationales Visum (Kategorie D) zum Studium. Es gilt auch für vorbereitende Maßnahmen wie einen verlangten Sprachkurs oder ein Studienkolleg.",
        chancenkarte: "Mit der Chancenkarte (§ 20a) können Sie bis zu ein Jahr nach Deutschland kommen, um eine Stelle zu suchen. Sie brauchen zuerst das Visum, auch wenn Sie mit Ihrer Staatsangehörigkeit sonst ohne Visum einreisen dürften: Das LEA Berlin kann nach einer visumfreien Einreise keine Chancenkarte erteilen."
      },
      where: "Die für Ihren Wohnort zuständige deutsche Auslandsvertretung (Botschaft oder Konsulat). Viele Visa lassen sich online über das Auslandsportal des Auswärtigen Amts beantragen: Sie laden Ihre Unterlagen hoch, die Vertretung prüft sie, dann folgt ein Termin für Fingerabdrücke und Foto. Online-Anträge gelten nur für eine Person; Familienangehörige beantragen vor Ort.",
      docs: {
        work: "Ein Jobangebot oder Arbeitsvertrag, Ihr Studienabschluss oder Ihre Berufsausbildung (in Deutschland anerkannt oder als vergleichbar bewertet) und die Unterlagen laut Checkliste Ihrer Vertretung. Für die Blaue Karte muss die Stelle mindestens sechs Monate dauern und zu Ihrer Qualifikation passen.",
        family: "Nachweis der Ehe oder eingetragenen Partnerschaft, der deutsche Aufenthaltstitel Ihres Partners (oder sein Visum bzw. Visumantrag, falls er noch nicht umgezogen ist) und der Nachweis einfacher Deutschkenntnisse auf Niveau A1, meist ein anerkanntes Sprachzertifikat. Den Rest nennt die Checkliste Ihrer Vertretung.",
        study: "Ihre Zulassung (oder Aufnahme in ein Studienkolleg), Nachweise über die nötigen Sprachkenntnisse und der Nachweis, dass Sie mindestens 992 € im Monat zum Leben haben, zum Beispiel ein Sperrkonto mit 11.904 € für das Jahr, eine Verpflichtungserklärung oder ein Stipendium.",
        chancenkarte: "Entweder ein in Deutschland anerkannter Abschluss oder eine anerkannte Berufsausbildung (dann ohne Punkte), oder mindestens 6 Punkte im Punktesystem mit einem Studium oder mindestens zweijähriger Berufsausbildung, die im Ausbildungsland staatlich anerkannt ist, plus Deutsch auf A1 oder Englisch auf B2. Dazu der Nachweis über mindestens 1.091 € im Monat, zum Beispiel ein Sperrkonto."
      },
      cost: "75 € für ein nationales Visum (D) (§ 46 Aufenthaltsverordnung). Manche Vertretungen arbeiten mit Dienstleistern, die eine zusätzliche Servicegebühr verlangen.",
      time: "Das Portal nennt keine feste Bearbeitungszeit; sie hängt von der Vertretung ab.",
      notes: {
        work: [
          "Gehaltsgrenzen der Blauen Karte EU für 2026: mindestens 50.700 € brutto im Jahr, oder 45.934,20 € für Engpassberufe, für Menschen, deren letzter Abschluss weniger als drei Jahre zurückliegt, und für IT-Fachleute ohne Abschluss (mit mindestens 3 Jahren IT-Erfahrung in den letzten 7 Jahren). Bei der niedrigeren Grenze muss die Bundesagentur für Arbeit (BA) zustimmen.",
          "Staatsangehörige von Australien, Israel, Japan, Kanada, Südkorea, Neuseeland, den USA und dem Vereinigten Königreich dürfen ohne Visum einreisen und den Aufenthaltstitel innerhalb von 90 Tagen nach der Einreise in Deutschland beantragen (§ 41 Aufenthaltsverordnung). Fragen Sie das LEA, bevor Sie anfangen zu arbeiten."
        ],
        family: [
          "Die A1-Regel gilt nicht, wenn Ihr Partner eine Blaue Karte EU oder eine Aufenthaltserlaubnis als Fachkraft hat (§ 18a/§ 18b und einige weitere) oder wenn Ihr Partner aufgrund seiner Staatsangehörigkeit für längere Aufenthalte visumfrei einreisen darf (§ 30 Abs. 1). Ausnahmen gibt es auch bei Krankheit oder Behinderung.",
          "Staatsangehörige von Australien, Israel, Japan, Kanada, Südkorea, Neuseeland, den USA und dem Vereinigten Königreich dürfen ohne Visum einreisen und den Antrag innerhalb von 90 Tagen in Deutschland stellen (§ 41 Aufenthaltsverordnung)."
        ],
        study: [
          "Staatsangehörige von Australien, Israel, Japan, Kanada, Südkorea, Neuseeland, den USA und dem Vereinigten Königreich dürfen ohne Visum einreisen und den Antrag innerhalb von 90 Tagen in Deutschland stellen (§ 41 Aufenthaltsverordnung).",
          "Noch keine Zulassung? Mit einem eigenen Visum zur Studienplatzsuche können Sie bis zu neun Monate bleiben. Dafür brauchen Sie 1.091 € im Monat."
        ],
        chancenkarte: "Mit der Chancenkarte dürfen Sie bis zu 20 Stunden pro Woche arbeiten und Probebeschäftigungen von jeweils bis zu zwei Wochen machen. Sobald Sie ein Jobangebot für eine qualifizierte Beschäftigung haben, können Sie beim LEA in einen Aufenthaltstitel zur Beschäftigung oder eine Folge-Chancenkarte wechseln."
      }
    },

    health_noneu: {
      title: "Kranken­versicherung",
      meta: { work: "Meist über Ihre Arbeit", family: "Für Sie und Ihren Partner", study: "Studentische Versicherung", chancenkarte: "Eigene Versicherung ab dem ersten Tag" },
      short: { work: "Sie brauchen ab dem ersten Tag eine deutsche Krankenversicherung. Mit einer Stelle wählen Sie eine Krankenkasse und sagen Ihrem Arbeitgeber Bescheid.", family: "Schließen Sie eine deutsche Krankenversicherung für sich und Ihren Partner ab. Eine ausländische Versicherung reicht meist nicht.", study: "Schließen Sie die studentische Krankenversicherung ab: 87,38 € im Monat plus den Zusatzbeitrag Ihrer Krankenkasse.", chancenkarte: "Schließen Sie eine private Krankenversicherung ab, die in Deutschland gilt. Mit einer Stelle wechseln Sie in eine Krankenkasse." },
      deadline: "Ab dem ersten Tag in Deutschland",
      what: {
        work: "Wer in Deutschland wohnt, muss krankenversichert sein (§ 193 Versicherungsvertragsgesetz). Als Angestellte oder Angestellter mit mehr als 603 € im Monat und weniger als 77.400 € im Jahr (2026) sind Sie in der gesetzlichen Krankenversicherung (GKV) pflichtversichert. Sie wählen eine Krankenkasse und teilen sie Ihrem Arbeitgeber innerhalb von zwei Wochen nach Beginn mit; sonst wählt der Arbeitgeber eine für Sie (§ 175 SGB V). Liegen Sie über der Grenze, können Sie freiwillig in der GKV bleiben oder privat versichert sein.",
        family: "Wer in Deutschland wohnt, muss krankenversichert sein (§ 193 Versicherungsvertragsgesetz). Für Ihren Aufenthaltstitel verlangt das LEA einen Krankenversicherungsnachweis für Sie beide und sagt, dass eine ausländische Versicherung grundsätzlich nicht genügt.",
        study: "Wer in Deutschland wohnt, muss krankenversichert sein (§ 193 Versicherungsvertragsgesetz). Studierende sind bis 30 in der gesetzlichen Krankenversicherung (GKV) pflichtversichert, zu einem ermäßigten Beitrag. Das LEA verlangt eine deutsche Versicherung: „Eine ausländische Krankenversicherung genügt grundsätzlich nicht.“",
        chancenkarte: "Wer in Deutschland wohnt, muss krankenversichert sein (§ 193 Versicherungsvertragsgesetz), und die Chancenkarte setzt das voraus. Laut der offiziellen Broschüre zur Chancenkarte können Sie zunächst eine private, in Deutschland gültige Krankenversicherung abschließen und in die gesetzliche Versicherung (GKV) wechseln, sobald Sie eine sozialversicherungspflichtige Stelle haben."
      },
      where: "Eine gesetzliche Krankenkasse Ihrer Wahl oder ein privater Versicherer. Bei privater Versicherung verlangt das LEA eine Bescheinigung nach § 257 Abs. 2a SGB V über Umfang und Kosten.",
      docs: "Reisepass und Visum. Für das LEA brauchen Sie später eine Kopie Ihrer Gesundheitskarte (Vorder- und Rückseite) oder eine aktuelle Bestätigung der Krankenkasse (gesetzlich) bzw. die Bescheinigung nach § 257 (privat).",
      cost: {
        study: "87,38 € im Monat plus der Zusatzbeitrag Ihrer Krankenkasse (Bundesministerium für Gesundheit, Stand 3. Sept. 2026).",
        default: "Gesetzliche Beiträge sind ein Anteil Ihres Einkommens. Private Beiträge hängen vom Versicherer und Tarif ab."
      },
      time: "Ab dem ersten Tag in Deutschland. Bei privater Versicherung kostet ein Abschluss mehr als einen Monat zu spät einen einmaligen Zuschlag: ein Monatsbeitrag für jeden angefangenen Monat ohne Versicherung, ab dem sechsten Monat ein Sechstel davon pro Monat (§ 193 Abs. 4).",
      flag: "Ihre Auslandsvertretung verlangt eventuell auch eine Reisekrankenversicherung für die ersten Wochen, bis die deutsche Versicherung beginnt. Die Regeln der einzelnen Vertretungen haben wir noch nicht geprüft; schauen Sie in die Checkliste Ihrer Vertretung."
    },

    anmeldung_noneu: {
      title: "Anmeldung der Wohnung",
      meta: "Bürgeramt, persönlich, mit Termin",
      short: "Buchen Sie einen Termin im Bürgeramt und melden Sie Ihre Wohnung innerhalb von 14 Tagen nach dem Einzug an. Es ist kostenlos.",
      deadline: "Innerhalb von 14 Tagen nach dem Einzug · Bußgeld bis 1.000 €",
      what: "Wer in Deutschland eine Wohnung bezieht, muss sich innerhalb von zwei Wochen anmelden (§ 17 Bundesmeldegesetz). Sie bekommen eine Meldebestätigung. Sie brauchen sie für Ihre Steuer-ID und als Adressnachweis für Ihren Aufenthaltstitel.",
      where: "Persönlich in einem beliebigen Berliner Bürgeramt, mit Termin über service.berlin.de. Die Online-Anmeldung in Berlin gibt es nur für Deutsche und EU-Bürger, und sie funktioniert nicht mit einem eAT.",
      docs: "Das Anmeldeformular, Ihr Reisepass (mit Visum) und die Wohnungsgeberbestätigung Ihres Vermieters. Ein Mietvertrag ersetzt sie nicht. Bei der ersten Anmeldung in Berlin können Personenstandsurkunden wie Heirats- oder Geburtsurkunde nötig sein.",
      cost: "Kostenlos.",
      time: "Sie bekommen die Meldebestätigung sofort, sobald Ihre Unterlagen geprüft sind.",
      discrepancy: {
        label: "Bekommen Sie rechtzeitig einen Termin?",
        rely: "Laut Berlins eigenen Zahlen gibt es inzwischen Termine innerhalb von 14 Tagen. Finden Sie keinen, schauen Sie später noch einmal: Neue Termine kommen im Laufe des Tages dazu.",
        claims: [
          { text: "berlin.de (15. Mai 2026): Im März 2026 bekam erstmals jeder, der einen Bürgeramtstermin innerhalb von 14 Tagen wollte, auch einen. Die Quote lag im März 2023 bei 48,5 %, 2024 bei 58,2 % und 2025 bei 74,0 %." },
          { text: "All About Berlin (Stand 11. Sept. 2026, englischsprachig): Wer keinen Termin findet, soll es später erneut versuchen. Neue Termine erscheinen während der Öffnungszeiten, meist morgens." }
        ]
      },
      notes: "Das Gesetz sieht zwei Wochen vor, eine verspätete Anmeldung kann bis zu 1.000 € kosten (§ 54). Manche Ratgeber sagen, in Berlin kontrolliere das niemand, aber Ihr Antrag auf den Aufenthaltstitel verlangt einen Adressnachweis. Melden Sie sich also zügig an."
    },

    permit: {
      title: "Aufenthalts­titel beim LEA",
      meta: "Landesamt für Einwanderung — Online-Antrag",
      short: "Stellen Sie den Antrag online beim LEA, bevor Ihr Visum abläuft. Speichern Sie die Bestätigung als PDF: Sie hält Sie während der Wartezeit legal.",
      deadline: "Bevor Ihr Visum abläuft (bis zu 4 Monate vorher)",
      what: "Ihr Visum ist nur der Anfang. Um zu bleiben, beantragen Sie einen Aufenthaltstitel beim Berliner Landesamt für Einwanderung (LEA). In Berlin geht das online. Nach Bezahlung und Absenden bekommen Sie eine Bestätigung als PDF. Sie bescheinigt, dass Ihr bisheriges Visum über das Ablaufdatum hinaus gilt, bis das LEA entscheidet (Fiktionswirkung, § 81 Abs. 4 Aufenthaltsgesetz). Speichern und drucken Sie sie.",
      where: "Online über Service Berlin. Laden Sie Ihre Unterlagen hoch (PDF, JPG oder PNG, je bis 7 MB und insgesamt bis 100 MB) und bezahlen Sie die Gebühr vor dem Absenden per Kreditkarte oder PayPal. Das LEA prüft den Antrag, fordert eventuell weitere Unterlagen an und lädt Sie dann zu einem Termin ein. Bringen Sie die Originale mit.",
      docs: "Farbkopien Ihres Reisepasses (Datenseite, dazu Einreisestempel und Visum), ein Adressnachweis (Meldebestätigung oder Mietvertrag plus Wohnungsgeberbestätigung), Ihr Mietvertrag mit Nachweis der aktuellen Warmmiete und der Nachweis einer deutschen Krankenversicherung. Die Unterlagen für Ihren Weg stehen weiter unten.",
      cost: "Erster Titel: 100 € als Karte (eAT) oder 56 € als Etikett im Pass. Verlängerung: 93 € (eAT) oder 49 € (Etikett). Wird beim Online-Antrag bezahlt und nach Beginn der Bearbeitung grundsätzlich nicht erstattet.",
      time: "Sie können den Antrag bis zu 4 Monate vor Ablauf Ihres Visums stellen und müssen ihn vor Ablauf stellen. Die PDF-Bestätigung hilft nicht, wenn Ihr Visum schon abgelaufen war oder Sie mit einem Schengen-Visum (C) eingereist sind.",
      notes: "Bringen Sie keine Papier-Passfotos zum LEA. Seit dem 14. Juli 2025 nimmt es nur digitale Fotos: Lassen Sie eines in einem Fotostudio oder einer Drogerie machen, die es in die Fotocloud des LEA hochlädt und Ihnen einen QR-Code gibt, oder nutzen Sie das PointID-Gerät vor Ort (6 €).",
      discrepancy: {
        label: "Wie lange es dauert",
        rely: "Eine offizielle Bearbeitungszeit gibt es nicht. Stellen Sie den Antrag so früh wie möglich (bis zu 4 Monate vor Ablauf Ihres Visums): Die PDF-Bestätigung hält Ihr Visum während der Wartezeit gültig.",
        claims: [
          { text: "Die Antragsseiten von Service Berlin nennen keine Gesamtbearbeitungszeit. Nach positiver Prüfung bekommen Sie einen Termin; dort kann ein Etikett ausgestellt werden, die Karte (eAT) braucht 4 bis 6 Wochen." },
          { text: "All About Berlin (Stand 11. Sept. 2026, englischsprachig): Es dauere 3 bis 6 Monate, aber 99 % der Anträge würden genehmigt; der Termin könne Monate später sein." }
        ]
      },
      variants: {
        work: {
          meta: "LEA Business Immigration Service — Online-Antrag",
          where: "Online über Service Berlin. Für Titel zur Beschäftigung sollen laut Berlin nur noch die Online-Anträge genutzt werden. Fachkräfte und Inhaber der Blauen Karte betreut der Business Immigration Service des LEA in der Keplerstraße 2, 10589 Berlin-Charlottenburg. Online bezahlen, PDF-Bestätigung speichern, dann auf den Termin warten und die Originale mitbringen.",
          docs: "Zusätzlich zu den Unterlagen oben: Ihr Arbeitsvertrag oder Jobangebot; das Formular „Erklärung zum Beschäftigungsverhältnis“, ausgefüllt und unterschrieben von Ihrem Arbeitgeber; Ihr Abschluss (mit anabin-Bewertung oder, falls nicht bewertet, einer Zeugnisbewertung der ZAB); und eine Berufserlaubnis, wenn Ihr Beruf eine braucht. Ab 45 Jahren ist in der Regel eine angemessene Altersversorgung nötig: 2026 mindestens 4.647,50 € brutto im Monat, wenn Sie keine andere Absicherung nachweisen.",
          flag: "Beim ersten Termin gibt Ihnen das LEA in der Regel eine Bescheinigung, mit der Sie sofort arbeiten dürfen, ohne auf die Karte (eAT) zu warten. Die Blaue Karte gilt für die Dauer Ihres Vertrags plus 6 Monate, höchstens 4 Jahre. Jobwechsel im ersten Jahr? Melden Sie ihn dem LEA.",
          discrepancy: {
            label: "Wann Inhaber der Blauen Karte die Niederlassungserlaubnis bekommen",
            rely: "Es zählt das Gesetz: 27 Monate, oder 21 mit ausreichenden Deutschkenntnissen. Die Übersichtsseite des LEA wirkt veraltet.",
            claims: [
              { text: "Das Gesetz (§ 18c Abs. 2 Aufenthaltsgesetz): nach 27 Monaten Beschäftigung mit Blauer Karte und einfachen Deutschkenntnissen, oder nach 21 Monaten mit ausreichenden Deutschkenntnissen." },
              { text: "Make it in Germany (Portal der Bundesregierung): 27 Monate mit Deutsch auf A1, 21 Monate mit B1." },
              { text: "Die Übersichtsseite des LEA zur Blauen Karte nennt noch 33 Monate, oder 21 mit ausreichenden Deutschkenntnissen. Das wirkt veraltet." }
            ]
          }
        },
        family: {
          meta: "LEA — Online-Antrag (seit 23. März 2026)",
          docs: "Zusätzlich zu den Unterlagen oben: eine Kopie des Passes Ihres Partners; Ihre Heiratsurkunde (ausländische Urkunden mit beglaubigter Übersetzung, eventuell mit Apostille oder Legalisation); der Nachweis einfacher Deutschkenntnisse, in der Regel A1 (außer es gilt eine Ausnahme); das Einkommen Ihrer Familie (Arbeitsvertrag, Nettolohn der letzten 6 Monate und eine Arbeitgeberbescheinigung, nicht älter als 14 Tage); und der Krankenversicherungsnachweis für Sie beide. Sie und Ihr Partner kommen gemeinsam zum Termin.",
          cost: "Erster Titel: 100 € als Karte (eAT) oder 56 € als Etikett. Verlängerung: 93 € oder 49 €. Keine Gebühr, wenn Sie Ihren Lebensunterhalt nicht ohne Leistungen (SGB II/XII oder AsylbLG) bestreiten können, mit aktuellem Bescheid als Nachweis.",
          time: "Stellen Sie den Antrag, bevor Ihr Visum abläuft. Nach dem Termin braucht die Karte mindestens 4 Wochen.",
          flag: "Beantragt Ihr Partner gleichzeitig seinen eigenen Titel zur Arbeit oder zum Studium in Berlin, kann er Sie stattdessen in seinen Online-Antrag aufnehmen; das LEA meldet sich dann wegen Ihres Titels bei Ihnen."
        },
        study: {
          meta: "LEA — Online-Antrag",
          docs: "Zusätzlich zu den Unterlagen oben: Ihre Immatrikulationsbescheinigung (oder bedingte Zulassung) und ein Finanzierungsnachweis: 992 € im Monat (11.904 € im Jahr) für 2026, über ein Sperrkonto, eine Verpflichtungserklärung, ein Stipendium, eine notariell beglaubigte Erklärung Ihrer Eltern mit deren Einkommen der letzten 6 Monate oder einen Arbeitsvertrag. Ihr Hauptwohnsitz muss in Berlin sein; ein Zweitwohnsitz reicht nicht.",
          flag: "Der Titel wird meist für zwei Jahre erteilt. Sie dürfen 140 volle Tage im Jahr arbeiten (Tage bis 4 Stunden zählen halb), und studentische Nebentätigkeiten an Ihrer Hochschule werden nicht angerechnet.",
          discrepancy: {
            label: "Dürfen Sie neben dem Studium selbstständig arbeiten?",
            rely: "In Berlin entscheidet das LEA über Ihren Titel, und es erlaubt eine selbstständige Nebentätigkeit. Prüfen Sie die Auflagen im Zusatzblatt Ihres Titels, bevor Sie anfangen.",
            claims: [
              { text: "LEA Berlin (Service-Berlin-Seite zum Studium): Eine selbstständige Nebentätigkeit ist erlaubt, solange das Studium nicht gefährdet ist." },
              { text: "Auswärtiges Amt (Seite zum Studienvisum, englisch): Selbstständige Tätigkeiten seien nicht erlaubt." }
            ]
          }
        },
        chancenkarte: {
          meta: "LEA — Online-Antrag",
          docs: "Zusätzlich zu den Unterlagen oben: eine Kopie Ihres nationalen Visums zur Arbeitssuche (oder Ihres aktuellen Titels zur Beschäftigung bzw. Ihrer Blauen Karte) und der Nachweis, dass Sie Ihren Lebensunterhalt decken können (Miete, Essen, Kleidung und Krankenversicherung), zum Beispiel ein Kontoauszug, Einkommensnachweise oder eine Stipendienbescheinigung.",
          cost: "100 € als Karte (eAT) oder 56 € als Etikett, wenn Sie mit einem nationalen D-Visum eingereist sind. 98 € oder 54 € beim Wechsel aus einem anderen Titel zur Beschäftigung.",
          flag: "Die Chancenkarte wird meist für ein Jahr erteilt. Nach einer visumfreien Einreise kann Berlin sie nicht erteilen. Sie können in einen anderen Titel wechseln, sobald Sie dessen Voraussetzungen erfüllen."
        }
      }
    },

    eat: {
      title: "eAT abholen (Ihre Aufenthaltskarte)",
      meta: "LEA — ein zweiter Termin",
      short: "Holen Sie Ihre Aufenthaltskarte (eAT) beim LEA ab. Bewahren Sie den PIN-Brief vom ersten Termin auf.",
      what: "Der elektronische Aufenthaltstitel (eAT) ist eine Plastikkarte mit Chip, hergestellt von der Bundesdruckerei. Deshalb sind meist zwei Termine nötig: einer für Fingerabdrücke, Unterschrift und Foto, einer zum Abholen der Karte.",
      where: "Beim LEA, sobald Ihnen mitgeteilt wird, dass die Karte fertig ist.",
      docs: "Ihr Reisepass. Beim ersten Termin bekommen Sie einen PIN-Brief: Bewahren Sie ihn gut auf. Er enthält eine fünfstellige Transport-PIN und eine PUK, die Sie für die Online-Ausweisfunktion der Karte brauchen.",
      cost: "In der Gebühr für den Titel enthalten.",
      time: "Laut Service Berlin braucht die Karte 4 bis 6 Wochen (bei Titeln für Familienangehörige mindestens 4 Wochen nach dem Termin).",
      flag: "Der eAT allein ist kein Ausweis: Zeigen Sie ihn zusammen mit Ihrem Reisepass und dem Zusatzblatt mit Ihren Auflagen (zum Beispiel zur Erwerbstätigkeit). Die Karte gilt höchstens 10 Jahre, Ihr Titel hat ein eigenes Ablaufdatum, das abweichen kann; prüfen Sie beides. Die Online-Ausweisfunktion des eAT funktioniert mit der BundID."
    },

    integration: {
      title: "Integrations­kurs",
      meta: "BAMF — das LEA entscheidet, ob er Pflicht ist",
      short: "Wenn das LEA es verlangt, besuchen Sie den Integrationskurs: Deutsch plus Orientierungskurs. Er kostet 2,29 € pro Stunde, die Hälfte können Sie zurückbekommen.",
      deadline: "Ihr Anspruch auf einen Platz erlischt nach 1 Jahr",
      what: "Der Integrationskurs besteht aus einem Deutschkurs und einem Orientierungskurs über Rechtsordnung, Kultur und Geschichte in Deutschland (§ 43 Aufenthaltsgesetz); der allgemeine Kurs umfasst 700 Stunden. Wenn Sie erstmals einen Aufenthaltstitel zur Arbeit oder zum Ehegattennachzug bekommen und dauerhaft hier leben, haben Sie Anspruch auf einen Platz. Zur Teilnahme verpflichtet werden können Sie, wenn Sie sich noch nicht einfach auf Deutsch verständigen können; bei Ehegatten, wenn die Deutschkenntnisse noch nicht ausreichen. Ob Sie verpflichtet sind, entscheidet das LEA bei der Erteilung Ihres Titels.",
      where: "Das LEA gibt Ihnen einen Berechtigungsschein. Damit wählen Sie einen Integrationskursträger, geben den Schein dort ab und melden sich an.",
      docs: "Ihr Berechtigungsschein und Ihr Aufenthaltstitel.",
      cost: "2,29 € pro Unterrichtsstunde: 1.603 € für den allgemeinen Kurs mit 700 Stunden, jeweils vor jedem Abschnitt von 100 Stunden zu zahlen. Die Hälfte können Sie zurückbeantragen, wenn Sie den Abschlusstest innerhalb von zwei Jahren nach Erhalt der Berechtigung bestehen. Wer Sozialleistungen oder ein geringes Einkommen bezieht, kann eine Befreiung beantragen (BAMF, Stand 1. Juli 2026).",
      time: "Ihr Anspruch auf einen Platz erlischt ein Jahr nach Erteilung Ihres Titels (§ 44 Abs. 2). Warten Sie also nicht zu lange.",
      notes: "Nicht verpflichtet sind Sie, wenn Sie in Deutschland eine Ausbildung machen oder die Teilnahme auf Dauer unmöglich oder unzumutbar ist. Wer schon ausreichend Deutsch spricht, hat keinen Anspruch auf den ganzen Kurs, darf aber am Orientierungskurs teilnehmen."
    }
  }
};
