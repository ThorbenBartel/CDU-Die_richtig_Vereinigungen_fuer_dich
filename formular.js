document.getElementById('infoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const birthdate = document.getElementById('birthdate').value;
    const postalcode = document.getElementById('postalcode').value;
    const status = document.getElementById('status').value;
    const gender = document.getElementById('gender').value;  // Geschlecht hinzufügen

    // Daten in localStorage speichern
    localStorage.setItem('birthdate', birthdate);
    localStorage.setItem('postalcode', postalcode);
    localStorage.setItem('status', status);
    localStorage.setItem('gender', gender);  // Geschlecht speichern

    // Weiterleitung zum Quiz
    window.location.href = 'quiz.html';
});