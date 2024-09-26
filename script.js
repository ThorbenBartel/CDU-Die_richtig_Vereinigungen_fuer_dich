// Vereinigungen und Sonderorganisationen mit Abkürzungen
let vereinigungen = [
    { name: "JU", langName: "Junge Union Deutschlands (JU)", punkte: 0 },
    { name: "FU", langName: "Frauen-Union (FU)", punkte: 0 },
    { name: "CDA", langName: "Christlich-Demokratische Arbeitnehmerschaft (CDA)", punkte: 0 },
    { name: "KPV", langName: "Kommunalpolitische Vereinigung (KPV)", punkte: 0 },
    { name: "MIT", langName: "Mittelstands- und Wirtschaftsvereinigung (MIT)", punkte: 0 },
    { name: "OMV", langName: "Ost- und Mitteldeutsche Vereinigung (OMV)", punkte: 0 },
    { name: "SU", langName: "Senioren-Union (SU)", punkte: 0 },
    { name: "EAK", langName: "Evangelischer Arbeitskreis (EAK)", punkte: 0 }
];

let aktuelleFragen = [];
let aktuelleFrageIndex = 0;

// JSON-Fragen laden
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        aktuelleFragen = data.fragen;
        zeigeFrage(aktuelleFrageIndex);
    })
    .catch(error => console.error('Fehler beim Laden der Fragen:', error));

// Funktion zum Anzeigen der aktuellen Frage
function zeigeFrage(index) {
    const frage = aktuelleFragen[index];
    document.getElementById('fragenummer').textContent = `Frage ${index + 1} von ${aktuelleFragen.length}`;
    document.getElementById('fragetext').textContent = frage.text;
}

// Funktion zum Verarbeiten der Antwort
function verarbeiteAntwort(antwort) {
    const frage = aktuelleFragen[aktuelleFrageIndex];
    const effekte = frage.effekte;

    // Aktualisiere Punkte für jede Vereinigung basierend auf der Antwort
    vereinigungen.forEach(vereinigung => {
        if (antwort === 'zustimmen' && effekte.zustimmen.includes(vereinigung.name)) {
            vereinigung.punkte += 1;
        } else if (antwort === 'neutral' && effekte.neutral.includes(vereinigung.name)) {
            vereinigung.punkte += 0; // Keine Änderung bei neutral
        } else if (antwort === 'ablehnen' && effekte.ablehnen.includes(vereinigung.name)) {
            vereinigung.punkte += 1;
        }
    });

    // Nächste Frage oder Ergebnis anzeigen
    aktuelleFrageIndex++;
    if (aktuelleFrageIndex < aktuelleFragen.length) {
        zeigeFrage(aktuelleFrageIndex);
    } else {
        zeigeErgebnis();
    }
}

// Ergebnis berechnen und anzeigen
function zeigeErgebnis() {
    vereinigungen.sort((a, b) => b.punkte - a.punkte);
    let ergebnisText = "Die Vereinigung(en), die am besten zu dir passen:\n\n";
    vereinigungen.forEach((vereinigung, index) => {
        ergebnisText += `${index + 1}. ${vereinigung.langName} mit einer Punktzahl von ${vereinigung.punkte}\n`;
    });

    document.getElementById('fragencontainer').style.display = 'none';
    document.getElementById('ergebniscontainer').style.display = 'block';
    document.getElementById('ergebnistext').textContent = ergebnisText;
}