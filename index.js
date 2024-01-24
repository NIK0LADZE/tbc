/** Slider Logic  */
const partners = document.querySelectorAll('.partner');
const sliderTracker = document.querySelector('.slider-tracker');
const sliderLeftArrow = document.querySelector('.slider_arrow.left');
const sliderRightArrow = document.querySelector('.slider_arrow.right');
let currentPartner = 0;
let sliderInterval;
let isDesktop = true;

window.addEventListener('resize', () => {
    const screenWidth = window.screen.availWidth;
    if (screenWidth < 1200 && isDesktop) {
        isDesktop = false;
        return;
    }

    if (screenWidth >= 1200 && !isDesktop) {
        isDesktop = true;
    }
})

const updateCurrentSlide = () => {
    const firstPartnerSlide = partners[0];
    const currentPartnerSlide = partners[currentPartner];
    const sliderTrackerCurrentBullet = sliderTracker.children[currentPartner];

    if (!isDesktop) {
        // TODO: add logic
    }

    Array.from(partners).forEach((partner, index) => {
        partner.classList.remove('active');
        sliderTracker.children[index].classList.remove('active');
    });

    currentPartnerSlide.classList.add('active');
    sliderTrackerCurrentBullet.classList.add('active');
};

const startSliderInterval = () => {
    sliderInterval = setInterval(() => {
        if (currentPartner < 2) {
            currentPartner++;
        } else {
            currentPartner = 0;
        }

        updateCurrentSlide();
    }, 3500);
}
startSliderInterval();

sliderLeftArrow.addEventListener('click', () => {
    clearInterval(sliderInterval);
    if (currentPartner > 0) {
        currentPartner--;
    } else {
        currentPartner = 2;
    }
    updateCurrentSlide();
    startSliderInterval();
});

sliderRightArrow.addEventListener('click', () => {
    clearInterval(sliderInterval);
    if (currentPartner < 2) {
        currentPartner++;
    } else {
        currentPartner = 0;
    }
    updateCurrentSlide();
    startSliderInterval();
});

Array.from(sliderTracker.children).forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
        clearInterval(sliderInterval);
        currentPartner = index;
        updateCurrentSlide();
        startSliderInterval();
    })
});