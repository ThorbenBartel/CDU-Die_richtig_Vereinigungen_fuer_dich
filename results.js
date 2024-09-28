(function() {
    // Vereinigungen aus localStorage holen
    let vereinigungen = JSON.parse(localStorage.getItem('vereinigungen')) || [];

    // Benutzerdaten aus localStorage holen
    const gender = localStorage.getItem('gender'); // Erwartet 'male' oder 'female'
    const birthdate = localStorage.getItem('birthdate');
    const userStatus = localStorage.getItem('status');
    const evangelisch = localStorage.getItem('evangelisch') === 'true'; // Konvertiere zu boolean
    const lsbtq = localStorage.getItem('lsbtq') === 'true'; // Konvertiere zu boolean

    // Funktion zur Berechnung des Alters
    function berechneAlter(geburtsdatum) {
        const heute = new Date();
        const geburtstag = new Date(geburtsdatum);
        let alter = heute.getFullYear() - geburtstag.getFullYear();
        const monat = heute.getMonth() - geburtstag.getMonth();
        if (monat < 0 || (monat === 0 && heute.getDate() < geburtstag.getDate())) {
            alter--;
        }
        return alter;
    }

    // Alter des Benutzers berechnen
    let alter = null;
    if (birthdate) {
        alter = berechneAlter(birthdate);
    } else {
        console.error('Kein Geburtsdatum vorhanden oder ungültig');
        // Hier können Sie festlegen, wie Sie mit einem fehlenden Geburtsdatum umgehen möchten
        alter = null;
    }

    // Filterung der Vereinigungen basierend auf den Benutzerdaten
    vereinigungen = vereinigungen.filter(vereinigung => {
        let include = true;

        // Geschlechtsbasierte Filterung
        if (gender === 'männlich' && vereinigung.name === 'Frauen Union') {
            include = false;
        }

        // Statusbasierte Filterung
        if ((userStatus === 'Schüler' || userStatus === 'Auszubildender') && vereinigung.name === 'RCDS') {
            include = false;
        }
        if (userStatus === 'Student' && vereinigung.name === 'SU ') {
            include = false;
        }

        // Altersbasierte Filterung
        if (alter !== null) {
            if (vereinigung.name === 'Schüler Union' && !(alter >= 12 && alter <= 24)) {
                include = false;
            }
            if ((vereinigung.name === 'JU' || vereinigung.name === 'RCDS') && !(alter >= 16 && alter <= 35)) {
                include = false;
            }
            if ((vereinigung.name === 'CDA' || vereinigung.name === 'KPV' || vereinigung.name === 'MIT' || vereinigung.name === 'OMV') && alter < 18) {
                include = false;
            }
            if (vereinigung.name === 'Senioren-Union' && alter < 60) {
                include = false;
            }
        }

        // Filter für Evangelisch
        if (vereinigung.name === 'EAK') {
            if (!evangelisch) {
                include = false;
            }
        }

        // Filter für LSBTQ
        if (vereinigung.name === 'LSU' && !lsbtq) {
            include = false;
        }

        return include;
    });

    console.log('Vereinigungen nach Filterung:', vereinigungen);

    // Überprüfen, ob noch Vereinigungen vorhanden sind
    if (vereinigungen.length === 0) {
        document.getElementById('ergebnistext').innerHTML = "Es wurden keine passenden Vereinigungen gefunden.";
        return;
    }

    // Jetzt kannst du die gefilterten Vereinigungen anzeigen
    zeigeErgebnis();

    function zeigeErgebnis() {
        const maxPunkte = vereinigungen.reduce((max, v) => Math.max(max, v.punkte), 0);

        // Sortiere Vereinigungen nach Punktzahl, absteigend
        vereinigungen.sort((a, b) => b.punkte - a.punkte);

        let ergebnisText = "Die Vereinigung(en), die am besten zu dir passen:<br><br>";

        vereinigungen.forEach((vereinigung) => {
            const prozent = ((vereinigung.punkte / maxPunkte) * 100).toFixed(1);

            ergebnisText += `
                <div class="ergebnis-item">
                <details>
                    <summary>
                    <div class="ergebnis-name"><strong>${vereinigung.langName}</strong></div>
                    <div class="ergebnis-bar">
                        <div class="ergebnis-fill" style="width: ${prozent}%"></div>
                    </div>
                    <div class="ergebnis-prozent"><strong>${prozent}%</strong></div>
                    </summary>
                    <div class="details-content">
                    <p><strong>Beschreibung:</strong> ${vereinigung.beschreibung ? vereinigung.beschreibung : 'Keine Beschreibung vorhanden'}</p>
                    <a href="${vereinigung.website}" target="_blank" ><strong>Mitglied werden</strong></a>
                    </div>
                </details>
                </div>
            `;
        });

        console.log('Angezeigte Vereinigungen:', vereinigungen);

        document.getElementById('ergebnistext').innerHTML = ergebnisText;
    }
})();