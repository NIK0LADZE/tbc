const burgerIcon = document.querySelector('.burger-icon');
const closeIcon = document.querySelector('.close-icon');
const menuOverlay = document.querySelector('.menu-overlay');
const menuNav = document.querySelector('nav');
let isMenuOpened = false;

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
