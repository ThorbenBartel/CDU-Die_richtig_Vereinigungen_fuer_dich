let vereinigungen = JSON.parse(localStorage.getItem('vereinigungen'));

// Benutzerdaten aus localStorage holen
const birthdate = document.getElementById('birthdate').value;
const postalcode = document.getElementById('postalcode').value;
const status = document.getElementById('status').value;
const gender = document.getElementById('gender').value; 

// Vereinigungen filtern
if (status === "Schüler" || status === "Auszubildender") {
    vereinigungen = vereinigungen.filter(vereinigung => vereinigung.name !== "RCDS");
}

// Hier kannst du auch eine Logik basierend auf dem Geschlecht hinzufügen, falls benötigt
if (gender === "männlich") {
    vereinigungen = vereinigungen.filter(vereinigung => vereinigung.name !== "FU");
}

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

    document.getElementById('ergebnistext').innerHTML = ergebnisText;
}

document.addEventListener('DOMContentLoaded', zeigeErgebnis);