// Scroll reveal + smooth anchors
(function () {
    'use strict';
    // 3D Carousel Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const maxIndex = slides.length - 1;

    function updateCarousel(direction = 0) {
        const prevIndex = (currentIndex === 0) ? maxIndex : currentIndex - 1;
        const nextIndex = (currentIndex === maxIndex) ? 0 : currentIndex + 1;

        slides.forEach((slide, i) => {
            // Fix ghosting by teleporting hidden slides before they become visible
            if (i === nextIndex && slide.classList.contains('hidden-prev')) {
                slide.style.transition = 'none';
                slide.classList.remove('hidden-prev');
                slide.classList.add('hidden-next');
                void slide.offsetWidth; // Force reflow
                slide.style.transition = '';
            } else if (i === prevIndex && slide.classList.contains('hidden-next')) {
                slide.style.transition = 'none';
                slide.classList.remove('hidden-next');
                slide.classList.add('hidden-prev');
                void slide.offsetWidth;
                slide.style.transition = '';
            }

            slide.className = 'carousel-slide'; // Reset
            
            if (i === currentIndex) {
                slide.classList.add('active');
            } else if (i === prevIndex) {
                slide.classList.add('prev');
            } else if (i === nextIndex) {
                slide.classList.add('next');
            } else {
                if (direction > 0) {
                    slide.classList.add('hidden-prev');
                } else if (direction < 0) {
                    slide.classList.add('hidden-next');
                } else {
                    slide.classList.add('hidden-next');
                }
            }
        });

        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
    }

    if (btnPrev && btnNext) {
        // Click handler for slides
        slides.forEach((slide) => {
            slide.addEventListener('click', () => {
                if (slide.classList.contains('active')) {
                    const href = slide.getAttribute('data-href');
                    if (href) {
                        window.location.href = href;
                    }
                }
            });
        });

        btnPrev.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? maxIndex : currentIndex - 1;
            updateCarousel(-1);
        });

        btnNext.addEventListener('click', () => {
            currentIndex = (currentIndex === maxIndex) ? 0 : currentIndex + 1;
            updateCarousel(1);
        });

        // Initialize
        updateCarousel();

        // Optional: Parallax effect on active slide image
        document.addEventListener('mousemove', (e) => {
            const activeSlide = document.querySelector('.carousel-slide.active');
            if (!activeSlide) return;
            const img = activeSlide.querySelector('.carousel-slide__image img');
            if (!img) return;

            const rect = activeSlide.getBoundingClientRect();
            // Check if mouse is over the active slide
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const moveX = (e.clientX - centerX) / 15;
                const moveY = (e.clientY - centerY) / 15;
                
                img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
            } else {
                img.style.transform = `translate(0px, 0px) scale(1)`;
            }
        });
    }

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();
