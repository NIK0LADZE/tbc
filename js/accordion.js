const questions = document.querySelectorAll('.question button');
const arrows = document.querySelectorAll('.question .arrow');
const answers = document.querySelectorAll('.answer');
let expandedAnswer;

const setExpandedState = (elements) => {
    elements.forEach((element) => {
        element.classList.remove('isExpanded');
    })

    if (expandedAnswer === null) return;
    elements[expandedAnswer].classList.add('isExpanded');
}

questions.forEach((question, index) => {
    question.addEventListener('click', () => {
        expandedAnswer = expandedAnswer !== index ? index : null;

        setExpandedState(arrows);
        setExpandedState(answers);
    });
});