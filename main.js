const questions = [{
        question: "Какой язык работает в браузере?",
        answers: [
            "Java",
            "C",
            "Python",
            "JavaScript"
        ],
        correct: 4,
    },
    {
        question: "Что означает CSS?",
        answers: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats",
        ],
        correct: 2,
    },
    {
        question: "Что означает HTML?",
        answers: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals Motorboats Lamborginis",
        ],
        correct: 1,
    },
    {
        question: "В каком году был создан JavaScript?",
        answers: [
            "1996",
            "1995",
            "1994",
            "все ответы неверные"
        ],
        correct: 2,
    },
];

//находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//переменные игры
let score = 0; //кол-во правльных ответов
let questionIndex = 0; //текущий вопрос


clearPage();
showQuestion();

submitBtn.onclick = checkAnswer;

//функция для очистки страницы 
function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}


function showQuestion() {

    //вопрос
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex].question);

    headerContainer.innerHTML = title;

    //варианты ответов
    let answerNumber = 1;

    for (answerText of questions[questionIndex].answers) {
        const questionTemplate =
            `<li>
                <label>
                    <input value="%number%" type="radio" class="answer" name="answer" />
                    <span>%answer%</span>
                </label>
            </li>`;

        // let answerHtml = questionTemplate.replace('%answer%', answerText)

        // answerHtml = answerHtml.replace('%number%', answerNumber);

        const answerHtml = questionTemplate
            .replace('%answer%', answerText)
            .replace('%number%', answerNumber);

        listContainer.innerHTML += answerHtml;
        answerNumber++;
    }
}

function checkAnswer() {

    //находим выбранную радиокнопку
    const checkRadio = listContainer.querySelector('input[type="radio"]:checked');

    //если ответа нет - выходим из функции
    if (!checkRadio) {
        submitBtn.blur();
        return
    }

    //ответ пользователя
    const userAnswer = parseInt(checkRadio.value);

    //если ответил верно - увеличиваем счет
    if (userAnswer === questions[questionIndex].correct) {
        score++;
    }

    if (questionIndex !== questions.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
        return;

    } else {
        clearPage();
        showResults();
    }

}

function showResults() {

    const resultsTemplate = `
            <h2 class="title">%title%</h2>
            <h3 class="summary">%message%</h3>
            <p class="result">%result%</p>
        `;

    let title, message;

    //варианты заголовков и текста
    if (score === questions.length) {
        title = 'Поздравляем! 😀';
        message = 'Вы ответили верно на все вопросы! 💪'
    } else if ((score * 100) / questions.length >= 50) {
        title = 'Не плохой результат! 🙂';
        message = 'Вы ответили верно на большу часть вопросов! 😋'
    } else {
        title = 'Стоит постараться! 🤔';
        message = 'У вас меньше половины правильных ответов! 🤓'
    }

    //РЕЗУЛЬТАТ
    let result = `${score} из ${questions.length}`;

    //финальный ответ, подставляем данные в шаблон

    const finalMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result);

    headerContainer.innerHTML = finalMessage;

    //меняем кнопку на "играть снова"
    submitBtn.blur();
    submitBtn.innerText = 'Начать заново';
    submitBtn.onclick = function () {
        history.go();
    }
}