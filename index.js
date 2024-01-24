/** Slider Logic  */
const partners = document.querySelector('.partners');
const sliderTracker = document.querySelector('.slider-tracker');
const sliderLeftArrow = document.querySelector('.slider_arrow.left');
const sliderRightArrow = document.querySelector('.slider_arrow.right');
let currentPartner = 0;
let sliderInterval;

const updateCurrentSlide = () => {
    const currentPartnerSlide = partners.children[currentPartner];
    const sliderTrackerCurrentBullet = sliderTracker.children[currentPartner];

    Array.from(partners.children).forEach((partner, index) => {
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