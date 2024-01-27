const burgerIcon = document.querySelector('.burger-icon');
const closeIcon = document.querySelector('.close-icon');
const menuOverlay = document.querySelector('.menu-overlay');
const menuNav = document.querySelector('nav');
const header = document.querySelector('header');
let isMenuOpened = false;
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
    if (!isMenuOpened) {
        menuOverlay.classList.remove('isMenuOpened');
        menuNav.classList.remove('isMenuOpened');
        return;
    }

    menuOverlay.classList.add('isMenuOpened');
    menuNav.classList.add('isMenuOpened');
}

burgerIcon.addEventListener('click', () => {
    isMenuOpened = true;
    openOrCloseMenu();
});

closeIcon.addEventListener('click', () => {
    isMenuOpened = false;
    openOrCloseMenu();
});

menuOverlay.addEventListener('click', () => {
    isMenuOpened = false;
    openOrCloseMenu();
});
