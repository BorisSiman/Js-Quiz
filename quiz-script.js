var score = 0;
var questionNum = 0;
var totalQuestions = questions.length;

var quizShow = document.getElementById("quiz");
var questionSite = document.getElementById("question");
var ans1 = document.getElementById("ans1");
var ans2 = document.getElementById("ans2");
var ans3 = document.getElementById("ans3");
var ans4 = document.getElementById("ans4");
var footerNum = document.getElementById("score");
var scoreSite = 0;
var scoreFinal = document.getElementById("finalPage");

var startButton = document.getElementById("startButton");
var nextButton = document.getElementById("nextButton");
var restartButton = document.getElementById("goAgain");
var finalButton = document.getElementById("finalScore");

restartButton.style.display = 'none';
finalButton.style.display = 'none';
quizShow.style.display = 'none';

startButton.addEventListener("click", startQuiz)

function startQuiz(){
questionLoad(questionNum);
quizShow.style.display = '';
startButton.style.display = 'none';
document.getElementById("welcome").style.display = 'none';

}

function questionLoad(questNum){
    if(footerNum == 6){
        footerNum = 0;
    }
    var q = questions[questNum];
    questionSite.textContent = (questNum + 1) + '.' + q.question;
    ans1.textContent = q.answer1;
    ans2.textContent = q.answer2;
    ans3.textContent = q.answer3;
    ans4.textContent = q.answer4;
    footerNum.textContent = (questionNum+1) + ' of ' + totalQuestions;    
};

function loadNext(){
    function restart(){
        score = 0;
        questionNum = 0;
        nextButton.style.display = '';
        nextButton.textContent = 'Next';
        restartButton.style.display = 'none';
        finalButton.style.display = 'none';
        questionLoad(questionNum);
    }
    
    function finalScore(){
        window.location.href = "score.html";
        scoreFinal.textContent = "Your score is " + score + " of " + totalQuestions + "that is : " + ((totalQuestions/score)*100) + "%";
    }

    var selected = document.querySelector('input[type=radio]:checked');
    if(!selected){
        alert('Please check your answer!')
        return;
    }
    var answer = selected.value;
    if(questions[questionNum].answer == answer){
        score +=1;
    }
    selected.checked = false;
    questionNum++;
    if(questionNum == totalQuestions - 1){
        nextButton.textContent = 'Finish';
    }
    if(questionNum == totalQuestions){
        scoreSite = alert("Your score is: " + score + "!\nClick on Final score button to check your answers and quiz procent or click restart button to try again!");
        restartButton.style.display = '';
        finalButton.style.display = '';
        nextButton.style.display = 'none';
        restartButton.addEventListener("click", restart);
        finalButton.addEventListener("click", finalScore);
        return;
    }
    
    questionLoad(questionNum);
}
