document.getElementById('infoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const birthdate = document.getElementById('birthdate').value;
    const postalcode = document.getElementById('postalcode').value;
    const status = document.getElementById('status').value;
    const gender = document.getElementById('gender').value;
    const evangelisch = document.getElementById('evangelisch').checked;  // Evangelisch Checkbox
    const lsbitq = document.getElementById('lsbitq').checked;  // LSBTIQ Checkbox

    // Daten in localStorage speichern
    localStorage.setItem('birthdate', birthdate);
    localStorage.setItem('postalcode', postalcode);
    localStorage.setItem('status', status);
    localStorage.setItem('gender', gender);
    localStorage.setItem('evangelisch', evangelisch);  // Evangelisch speichern (true/false)
    localStorage.setItem('lsbitq', lsbitq);  // LSBTIQ speichern (true/false)

    // Weiterleitung zum Quiz
    window.location.href = 'quiz.html';
});