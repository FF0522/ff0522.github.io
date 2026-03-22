document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, background 0.3s, border-color 0.3s, box-shadow 0.3s';
        scrollObserver.observe(card);
    });
});