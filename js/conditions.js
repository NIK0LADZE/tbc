const termsAndConditionsLinks = document.querySelectorAll('.terms-and-conditions');
const termsAndConditionsBlock = document.querySelector('.terms-and-conditions-block');
const overlay = document.querySelectorAll('.overlay');
const termsCloseIcon = document.querySelector('.terms-and-conditions-block .close-icon');

termsAndConditionsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        termsAndConditionsBlock.classList.add('isOpened');
        overlay[1].classList.add('isOpened', 'terms')
    });
});

overlay[1].addEventListener('click', () => {
    termsAndConditionsBlock.classList.remove('isOpened')
    overlay[1].classList.remove('isOpened', 'terms')
});

termsCloseIcon.addEventListener('click', () => {
    termsAndConditionsBlock.classList.remove('isOpened')
    overlay[1].classList.remove('isOpened', 'terms')
});
