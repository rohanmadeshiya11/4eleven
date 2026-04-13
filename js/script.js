document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscribe-form');
    const success = document.getElementById('success-msg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        success.classList.remove('hidden');
    });
});
