var score = 0;
var questionNum = 0;
var totalQuestions = questions.length;
var wrong = new Array();

var quizShow = document.getElementById("quiz"); //quizContainer
var questionSite = document.getElementById("question"); //questionContainer
var ans1 = document.getElementById("ans1"); //answer1,2,3,4 container
var ans2 = document.getElementById("ans2");
var ans3 = document.getElementById("ans3");
var ans4 = document.getElementById("ans4");
var footerNum = document.getElementById("score"); //footer container

var scoreFinal = document.getElementById("scoreSite"); // score on scorePage

var startButton = document.getElementById("startButton"); //start quiz button, onclick calls questionLoad and dissapear
var nextButton = document.getElementById("nextButton"); //button on click calls function load next

var finalButton = document.getElementById("finalScore"); //button opens final score
var restartFinal = document.getElementById("restartFinal"); //button that restart the quiz

finalButton.style.display = 'none';
quizShow.style.display = 'none';
scoreFinal.style.display = 'none';
restartFinal.style.display = 'none';
document.getElementById("lineShow").style.display = 'none';

startButton.addEventListener("click", startQuiz)

function startQuiz(){
questionLoad(questionNum);
quizShow.style.display = '';
startButton.style.display = 'none';
document.getElementById("welcome").style.display = 'none';
scoreFinal.style.display = 'none';

}

function questionLoad(questNum){
    var q = questions[questNum];
    questionSite.textContent = (questNum + 1) + '.' + q.question;
    ans1.textContent = q.answer1;
    ans2.textContent = q.answer2;
    ans3.textContent = q.answer3;
    ans4.textContent = q.answer4;
    footerNum.textContent = (questionNum+1) + ' of ' + totalQuestions + '.';    
};

function loadNext(){
    function restart(){
        score = 0;
        questionNum = 0;
        nextButton.style.display = '';
        nextButton.textContent = 'Next';
        finalButton.style.display = 'none';
        quizShow.style.display = '';
        scoreFinal.style.display = 'none';
        restartFinal.style.display = 'none';
        document.getElementById("lineShow").style.display = 'none';
        questionLoad(questionNum);
        wrong = [];
    }

    function finalScore(){
        quizShow.style.display = 'none';
        scoreFinal.style.display = '';
        restartFinal.style.display = '';
        document.getElementById("lineShow").style.display = '';
        var newline = "<br/>";
        scoreFinal.innerHTML = "Your score is: " + score + "." + newline + "That is: " +((score/totalQuestions) * 100) + "%. " + newline + "You had " + wrong.length + " incorrect answers!" +newline;
        
        if(score == 10){
        scoreFinal.innerHTML += "That's incredible!" + newline;
        }
        else{
        scoreFinal.innerHTML += "Your answer was wrong on question:" + newline;
        }
        for(var i = 0; i<wrong.length; i++){
            scoreFinal.innerHTML += questions[wrong[i]].question + newline;
        }
        if(score == 10){
            scoreFinal.innerHTML += "Your genious! Congratulations!";
        }
        if(score <= 9 && score > 6){
            scoreFinal.innerHTML += "Your good, but not the best! Try again now when u know what you did wrong.";
        }
        if(score <=6){
            scoreFinal.innerHTML += "Try again, you need more practice!";
        }
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
    if(questions[questionNum].answer != answer){
        wrong.push(questionNum);
        console.log(wrong);
    }
    selected.checked = false;
    questionNum++;
    if(questionNum == totalQuestions - 1){
        nextButton.textContent = 'Finish';
    }
    if(questionNum == totalQuestions){
        alert("Your score is: " + score + "!\nClick on Final score button to check your answers and quiz percent. \nIf your not satisfied with your score you can try again!");
        finalButton.style.display = '';
        nextButton.style.display = 'none';
        finalButton.addEventListener("click", finalScore);
        restartFinal.addEventListener("click", restart);
        return;
    }
    questionLoad(questionNum);
}