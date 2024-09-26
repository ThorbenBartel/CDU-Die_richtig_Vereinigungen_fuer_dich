// Vereinigungen und Sonderorganisationen mit Abkürzungen
let vereinigungen = [
    // Vereinigungen
    { name: "JU", langName: "Junge Union (JU)", punkte: 0, website: "https://www.ju-nrw.de/mitmachen" },
    { name: "FU", langName: "Frauen-Union (FU)", punkte: 0, website: "https://www.frauenunion.de/mitglied-werden" },
    { name: "CDA", langName: "Christlich-Demokratische Arbeitnehmerschaft (CDA)", punkte: 0, website: "https://www.cda-bund.de/mitmachen" },
    { name: "KPV", langName: "Kommunalpolitische Vereinigung (KPV)", punkte: 0, website: "http://kpv.de/mitgliedsantrag/" },
    { name: "MIT", langName: "Mittelstands- und Wirtschaftsvereinigung (MIT)", punkte: 0, website: "https://www.mit-bund.de/mitgliedschaft" },
    { name: "OMV", langName: "Ost- und Mitteldeutsche Vereinigung (OMV)", punkte: 0, website: "https://www.omv.cdu.de/ueber-uns/mitglied-werden" },
    { name: "SU", langName: "Senioren-Union (SU)", punkte: 0, website: "https://www.senioren-union.de/mitgliedschaft"},
    { name: "EAK", langName: "Evangelischer Arbeitskreis (EAK)", punkte: 0, website: "https://www.eak-cducsu.de/artikel/mitgliedschaft" },

    
    // Sonderorganisationen
    //TODO RCDS nach weg Miglidschaft!
    { name: "RCDS", langName: "Ring Christlich-Demokratischer Studenten (RCDS)", punkte: 0, website: "https://www.rcds.de/vor-ort/" },
    { name: "LSU", langName: "Lesben und Schwule in der Union (LSU)", punkte: 0, website: "https://www.lsu-deutschlands.de/mach-mit" },

    // Arebitsgruppem
    { name: "SU", langName: "Schüler Union (SU)", punkte: 0, website: "https://www.schueler-union.de/mitmachen/eintritt" },
];

let aktuelleFragen = [];
let aktuelleFrageIndex = 0;

const videoContainer = document.getElementById('videocontainer');
const video = document.getElementById('introvideo');
const weiterButton = document.getElementById('weiter-button');

// JSON-Fragen laden
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        aktuelleFragen = data.fragen;
        zeigeFrage(aktuelleFrageIndex);
    })
    .catch(error => console.error('Fehler beim Laden der Fragen:', error));

function zeigeFrage(index) {
    const frage = aktuelleFragen[index];
    document.getElementById('fragenummer').textContent = `Frage ${index + 1} von ${aktuelleFragen.length}`;
    document.getElementById('fragetext').textContent = frage.text;
}

function verarbeiteAntwort(antwort) {
    const frage = aktuelleFragen[aktuelleFrageIndex];
    const effekte = frage.effekte;

    vereinigungen.forEach(vereinigung => {
        if (antwort === 'zustimmen' && effekte.zustimmen.includes(vereinigung.name)) {
            vereinigung.punkte += 1;
        } else if (antwort === 'neutral' && effekte.neutral.includes(vereinigung.name)) {
            vereinigung.punkte += 0;
        } else if (antwort === 'ablehnen' && effekte.ablehnen.includes(vereinigung.name)) {
            vereinigung.punkte += 1;
        }
    });

    aktuelleFrageIndex++;

    if (aktuelleFrageIndex >= aktuelleFragen.length) {
        zeigeVideo();
    } else {
        zeigeFrage(aktuelleFrageIndex);
    }
}

// Funktion zum Anzeigen des Videos nach dem Quiz
function zeigeVideo() {
    document.getElementById('fragencontainer').style.display = 'none';
    videoContainer.style.display = 'block';

    // Wenn das Video endet, wird der Weiter-Button aktiviert
    video.onended = function() {
        weiterButton.disabled = false;  // Button wird aktiv, nachdem das Video endet
    };

    // Benutzer kann das Video überspringen und sofort auf "Weiter" klicken
    weiterButton.addEventListener('click', function() {
        video.pause();  // Stoppt das Video, falls es noch läuft
        zeigeErgebnisSeite();
    });
}

// Leitet zur Ergebnisseite weiter
function zeigeErgebnisSeite() {
    localStorage.setItem('vereinigungen', JSON.stringify(vereinigungen));
    window.location.href = 'results.html';  // Weiterleitung zur Ergebnisseite
}