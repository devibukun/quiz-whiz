const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const navigation = document.getElementById('navigation');
const menuButton = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const sideBar = document.getElementById('side-navbar');
const about = document.getElementById("about");
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const container = document.querySelector('.container');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

// To show pop-up information using the start button/add background blur
startBtn.onclick = () => {
     popupInfo.classList.add('active');
     main.classList.add('active');
     navigation.classList.add('active');
     about.style.display = "none";
     document.body.style.overflowY = "hidden";
    
    
}

// To close the pop upinformation using the exit quiz button/remove background blur
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active'); 
    navigation.classList.remove('active');
    about.style.display = "block";
    document.body.style.overflowY = "auto";
}

// Side MenuBar Functionality
navigation.onclick = function(){
    if(navigation.style.right === "-200px"){
        navigation.style.right = "0";
    }else{
        navigation.style.right = "-200px";
    }
}

// Continue Button Functionality
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active'); 
    quizSection.style.display = "block";
   
    setTimeout(() =>{
       quizSection.style.left = '0';
    },50);
    container.style.display = "flex";
    quizBox.classList.add('active'); 
    navigation.classList.remove('active'); 
    
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeBtn.onclick = () => {
    document.querySelector('.container').classList.remove('active');
    document.querySelector('.container').style.display= 'none';
    document.querySelector('.home').style.display = 'flex';
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    document.body.style.overflowY = "auto";
    about.style.display = "block";

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');
nextBtn.onclick = () => {
    if(questionCount < questions.length -1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');

    }else{
        showResultBox();
    }
  
}

const optionList = document.querySelector('.option-list');

// GETTING QUESTIONS AND OPTIONS FROM ARRAY

function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let  i = 0; i< option.length; i++){
         option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}


function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer === correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }else{
        answer.classList.add('incorrect');

        // if user answer is wrong, auto select the correct one
        for (let i = 0; i < allOptions; i++){
           if(optionList.children[i].textContent == correctAnswer){
            optionList.children[i].setAttribute('class', 'option correct');
           }
        }
    }


    // if user has selected, disabled all options
for (let i = 0; i < allOptions; i++){
    optionList.children[i].classList.add('disabled');
}
nextBtn.classList.add('active');
}



function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent =  `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length} `;
}


function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() =>{
        progressStartValue++;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(225,255,255,.1) 0deg)`;
      progressValue.textContent = `${progressStartValue}%`;
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }

    },speed);
} 