document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('nav a, .footer-links a');
    const sections = document.querySelectorAll('section');

    function activateSection(sectionId) {
        sections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');

        links.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function checkViewport() {
        const threshold = 0.5;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight) ||
                                (rect.top <= window.innerHeight * threshold && rect.bottom >= 0);
            if (isVisible) {
                activateSection(section.id);
            }
        });
    }

    window.addEventListener('scroll', checkViewport);

    const currentHash = window.location.hash.substring(1); 
    if (currentHash) {
        activateSection(currentHash);
    } else {
        activateSection(sections[0].id);
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('nav a, .footer-links a');
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('h1, h2, p, .buttons');

    function activateSection(section) {
        sections.forEach(sec => sec.classList.remove('active'));
        section.classList.add('active');
    }

    function checkViewport() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                activateSection(section);
                animateElements(section);
            }
        });
    }

    function animateElements(section) {
        const elements = section.querySelectorAll('h1, h2, p, .buttons');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2 + 0.5}s`;
            el.classList.add('animate');
        });
    }

    links.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            setTimeout(() => {
                activateSection(targetElement);
                animateElements(targetElement);
            }, 600); 
        });
    });

    setTimeout(() => {
        activateSection(document.querySelector('#home'));
        animateElements(document.querySelector('#home'));
    }, 500); 

    sections.forEach(section => {
        section.classList.add('active');
        animateElements(section);
    });

    window.addEventListener('scroll', checkViewport);
    checkViewport(); 
});