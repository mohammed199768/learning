document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Smooth Scroll for Navbar ---
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. Navbar Active State on Scroll (ScrollSpy) ---
    const sections = document.querySelectorAll('section, header');
    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 3. Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    const cards = document.querySelectorAll('.stagger-card');

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // Add animation classes based on original class
                if (el.classList.contains('fade-in-up')) {
                    el.style.animation = 'fadeInUp 1s ease forwards';
                } else if (el.classList.contains('fade-in-right')) {
                    el.style.animation = 'fadeInRight 1s ease forwards';
                } else if (el.classList.contains('fade-in-left')) {
                    el.style.animation = 'fadeInLeft 1s ease forwards';
                }

                // Stop observing after animation triggers
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => animationObserver.observe(el));

    // Special Staggered Animation for Cards
    const cardsObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            cards.forEach((card, index) => {
                card.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
            });
            // Stop observing container or first card once triggered
            observer.disconnect();
        }
    }, { threshold: 0.1 });

    if (cards.length > 0) {
        cardsObserver.observe(cards[0]); // Observe using the first card as trigger for the group
    }

});
