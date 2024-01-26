const originalSlides = document.querySelectorAll('.partner-slide');
const sliderTracker = document.querySelectorAll('.slider-tracker li');
const sliderLeftArrow = document.querySelector('.slider_arrow.left');
const sliderRightArrow = document.querySelector('.slider_arrow.right');
let sliderInterval;
let nextSlide = 0;
let isFirstLoad = true;
let canSlideBeChangedManually = true;
let isDesktop = window.screen.availWidth >= 1200;

// Update slider logic depending on viewport
window.addEventListener('resize', () => {
    const screenWidth = window.screen.availWidth;
    if (screenWidth < 1200 && isDesktop) {
        isDesktop = false;
        return;
    }

    if (screenWidth >= 1200 && !isDesktop) {
        isDesktop = true;
    }
});

const showNextSlide = ({ direction = '' } = {}) => {
    const slider = document.querySelector('.partners-slider');
    const [currentPartnerNode] = slider.children;

    // Delete all slides from slider
    slider.innerHTML = '';
    // Disable slider arrows while slide is being changed
    canSlideBeChangedManually = false;
    // Update Slider tracker bullet
    sliderTracker.forEach(bullet => bullet.classList.remove('active'));
    sliderTracker[nextSlide || 0].classList.add('active');

    // Display initial slide for Desktop
    if (isFirstLoad) {
        isFirstLoad = false;
        slider.append(currentPartnerNode);

        setTimeout(() => {
            if (isDesktop) {
                slider.children[0].classList.add('active');
            }
        }, 0);

        return;
    }

    const outgoingSlide = direction === 'left' ? 1 : 0;
    const incomingSlide = direction === 'right' ? 1 : 0;
    const firstChildNode = direction === 'left' ? originalSlides[nextSlide] : currentPartnerNode;
    const secondChildNode = direction === 'right' ? originalSlides[nextSlide] : currentPartnerNode;
    // Populate slider with slides ordered by direction
    slider.append(firstChildNode, secondChildNode);
    const slideToRemove = direction === 'left' ? slider.lastChild : slider.firstChild;

    // Before slider starts moving in left direction on Mobile
    if (!isDesktop && direction === 'left') {
        slider.children[outgoingSlide].style.transform = "translate(-100vw)";
        slider.children[incomingSlide].style.transform = "translate(-100vw)";
        slider.children[outgoingSlide].style.removeProperty('transition');
        slider.children[incomingSlide].style.removeProperty('transition');
    }

    setTimeout(() => {
        if (!isDesktop) {
            // When slider is moving in either direction on Mobile
            const translateValue = direction === 'right' ? 'translate(-100vw)' : 'none';
            slider.children[outgoingSlide].style.transform = translateValue;
            slider.children[incomingSlide].style.transform = translateValue;
            slider.children[outgoingSlide].style.transition = "1s";
            slider.children[incomingSlide].style.transition = "1s";
            return;
        }

        // When slider is moving in either direction on Desktop
        slider.children[outgoingSlide].classList.remove('active');
        slider.children[incomingSlide].classList.add('active');
    }, 1);

    setTimeout(() => {
        if (!isDesktop) {
            slider.children[outgoingSlide].style.removeProperty('transform');
            slider.children[incomingSlide].style.removeProperty('transform');
            slider.children[outgoingSlide].style.removeProperty('transition');
            slider.children[incomingSlide].style.removeProperty('transition');
        }

        // Remove slide (first or second, depending on which direction slider was moved)
        slider.removeChild(slideToRemove)
        // Enable Slider arrows, slide has finished changing
        canSlideBeChangedManually = true;
    }, 1000);
};

const startSliderInterval = (direction) => {
    // handle manual slide changes in either direction
    showNextSlide(direction);

    sliderInterval = setInterval(() => {
        if (nextSlide < 2) {
            nextSlide++;
        } else {
            nextSlide = 0;
        }
        // Default direction is right
        showNextSlide({ direction: 'right' });
    }, 3500);
}
// Start slider on initial load
startSliderInterval();

// Restart slider with left or right slide
const sliderArrowClickHandler = (direction = '') => {
    if (!canSlideBeChangedManually) return;

    clearInterval(sliderInterval);

    if (direction === 'left') {
        nextSlide = (nextSlide > 0) ? nextSlide - 1 : 2;
    }

    if (direction === 'right') {
        nextSlide = (nextSlide < 2) ? nextSlide + 1 : 0;
    }

    startSliderInterval({ direction });
};

sliderLeftArrow.addEventListener('click', () => {
    sliderArrowClickHandler('left');
});

sliderRightArrow.addEventListener('click', () => {
    sliderArrowClickHandler('right');
});

// Restart slider according to which bullet was clicked
sliderTracker.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
        if (index === nextSlide) return;
        clearInterval(sliderInterval);
        const direction = index >= nextSlide ? 'right' : 'left';
        nextSlide = index;
        startSliderInterval({ direction});
    })
});
