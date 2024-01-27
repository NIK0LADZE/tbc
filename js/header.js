const burgerIcon = document.querySelector('.burger-icon');
const menuCloseIcon = document.querySelector('nav .close-icon');
const menuOverlay = document.querySelector('header .overlay');
const menuNav = document.querySelector('nav');
const header = document.querySelector('header');
let isOpened = false;
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 50) {
        if (!header.classList.contains('isHeaderHidden')) {
            header.classList.add('isHeaderHidden');
        }
    } else {
        if (header.classList.contains('isHeaderHidden')) {
            header.classList.remove('isHeaderHidden');
        }
    }

    lastScrollTop = scrollTop;
});

const openOrCloseMenu = () => {
    if (!isOpened) {
        menuOverlay.classList.remove('isOpened');
        menuNav.classList.remove('isOpened');
        burgerIcon.classList.remove('closeIcon')
        return;
    }

    menuOverlay.classList.add('isOpened');
    menuNav.classList.add('isOpened');
    burgerIcon.classList.add('closeIcon')
}

burgerIcon.addEventListener('click', () => {
    isOpened = !isOpened;
    openOrCloseMenu();
});

menuOverlay.addEventListener('click', () => {
    isOpened = false;
    openOrCloseMenu();
});
