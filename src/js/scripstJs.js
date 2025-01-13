document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // Spinner
    const spinner = () => {
        setTimeout(() => {
            const spinnerElement = document.getElementById('spinner');
            if (spinnerElement) {
                spinnerElement.classList.remove('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 45) {
            navbar.classList.add('sticky-top', 'shadow-sm');
        } else {
            navbar.classList.remove('sticky-top', 'shadow-sm');
        }
    });

    // Dropdown on mouse hover
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownToggle = document.querySelectorAll('.dropdown-toggle');
    const dropdownMenu = document.querySelectorAll('.dropdown-menu');
    const showClass = 'show';

    const handleDropdownHover = () => {
        if (window.matchMedia("(min-width: 992px)").matches) {
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', () => {
                    dropdown.classList.add(showClass);
                    dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
                    dropdown.querySelector('.dropdown-menu').classList.add(showClass);
                });
                dropdown.addEventListener('mouseleave', () => {
                    dropdown.classList.remove(showClass);
                    dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                    dropdown.querySelector('.dropdown-menu').classList.remove(showClass);
                });
            });
        } else {
            dropdowns.forEach(dropdown => {
                dropdown.removeEventListener('mouseenter', handleDropdownHover);
                dropdown.removeEventListener('mouseleave', handleDropdownHover);
            });
        }
    };

    window.addEventListener('load', handleDropdownHover);
    window.addEventListener('resize', handleDropdownHover);

    // Helper function to animate the counter
function animateCounter(element, start, end, duration) {
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.innerText = end; // Ensure the final value is set
        }
    }

    window.requestAnimationFrame(step);
}

// Find all elements with the data-toggle="counter-up" attribute
document.querySelectorAll('[data-toggle="counter-up"]').forEach(counter => {
    const endValue = parseInt(counter.innerText, 10);
    counter.innerText = '0'; // Set initial value to 0
    animateCounter(counter, 0, endValue, 2000); // Animate from 0 to endValue over 2000ms
});

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Testimonials carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        // Implement carousel functionality, for example using OwlCarousel
        $(testimonialCarousel).owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }

    // Vendor carousel
    const vendorCarousel = document.querySelector('.vendor-carousel');
    if (vendorCarousel) {
        // Implement carousel functionality, for example using OwlCarousel
        $(vendorCarousel).owlCarousel({
            loop: true,
            margin: 45,
            dots: false,
            autoplay: true,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 2
                },
                576: {
                    items: 4
                },
                768: {
                    items: 6
                },
                992: {
                    items: 8
                }
            }
        });
    }
});
