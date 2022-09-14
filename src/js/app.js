const toggles = document.querySelectorAll('input[name="toggle"]');

toggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
        if (toggle.value === 'yearly') {
            document.querySelector('#starter').textContent = '12$';
            document.querySelector('#professional').textContent = '36$';
            document.querySelector('#company').textContent = '56$';
        } else {
            document.querySelector('#starter').textContent = '19$';
            document.querySelector('#professional').textContent = '54$';
            document.querySelector('#company').textContent = '89$';
        }
    });
});
