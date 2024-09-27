let vereinigungen = JSON.parse(localStorage.getItem('vereinigungen')) || [];

function zeigeErgebnis() {
    const maxPunkte = vereinigungen.reduce((max, v) => Math.max(max, v.punkte), 0);

    vereinigungen.sort((a, b) => b.punkte - a.punkte);

    let ergebnisText = "Die Vereinigung(en), die am besten zu dir passen:<br><br>";

    vereinigungen.forEach((vereinigung, index) => {
        const prozent = (vereinigung.punkte / maxPunkte * 100).toFixed(1);

        ergebnisText += `
            <div class="ergebnis-item">
                <details>
                    <summary>
                        <div class="ergebnis-name">${vereinigung.langName}</div>
                        <div class="ergebnis-bar">
                            <div class="ergebnis-fill" style="width: ${prozent}%"></div>
                        </div>
                        <div class="ergebnis-prozent">${prozent}%</div>
                    </summary>
                    <div class="details-content">
                        <p>Mehr Informationen über die Vereinigung findest du hier:</p>
                        <a href="${vereinigung.website}" target="_blank">Mitglied werden</a>
                    </div>
                </details>
            </div>
        `;
    });

    document.getElementById('ergebnistext').innerHTML = ergebnisText;
}

document.addEventListener('DOMContentLoaded', zeigeErgebnis);