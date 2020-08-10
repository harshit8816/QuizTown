
var cateId = localStorage.getItem("categoryValue");
// console.log(cateId);
var levelId = localStorage.getItem("levelValue");
// console.log(levelId);


var myCategoryimages = { "1": "public/categories/artAndLiterature.jpg", "2": "public/categories/generalKnowledge.jpg", "3": "public/categories/geography.jpg", "4": "public/categories/history.jpg", "5": "public/categories/music.jpg", "6": "public/categories/scienceAndNature.jpg", "7": "public/categories/sport.jpg", "8": "public/categories/tieBreak.jpg", "9": "public/categories/tvAndFilms,jpg" };

var lengthofobject = data[cateId][levelId].length;
// console.log(lengthofobject);

var curPage = 0, correct = 0;
var myAnswers = [];


var newimage = document.getElementById("categoryWiseImage");
var myHeader = document.getElementById("quizHeader");
var myQuestion = document.getElementById("questions");
var myAnswerz = document.getElementById("answer");
var classname = document.getElementsByClassName("answer-btn");
var progressBar = document.getElementById("progress-bar");
var btnNext = document.getElementById("btnNext");
var btnPrevious = document.getElementById("btnPrevious");
var submitBtn = document.getElementById('Submit');

checkPage();
// console.log('hello');

btnNext.addEventListener("click", moveNext);
btnPrevious.addEventListener("click", moveBack);
submitBtn.addEventListener("click", endQuiz);

function myAnswer() {
    var idAnswer = this.getAttribute("data-id");
    //check for correct answer
    myAnswers[curPage] = idAnswer;
    if (data[cateId][levelId][curPage].correct == idAnswer) {
        // console.log('Correct Answer');
    } else {
        // console.log('Wrong Answer');
    }
    addBox();
}

function addBox() {
    for (var i = 0; i < myAnswerz.children.length; i++) {
        var curNode = myAnswerz.children[i];
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selectAnswer");
        } else {
            curNode.classList.remove("selectAnswer");
        }
    }
}

function moveNext() {

    //check if an answer has been made
    if (myAnswers[curPage]) {
        // console.log('Okay to proceed');
        if (curPage < (lengthofobject - 1)) {
            curPage++;
            checkPage(curPage);
        } else {
            //check if quiz is complete
            // console.log(curPage + ' ' + myQuiz.length);
            if (lengthofobject >= curPage) {
                endQuiz();
            } else {
                // console.log('end of Quiz Page' + curPage);
            }
        }
    } else {
        // console.log('not answered');
    }
}


function endQuiz() {
    if (myAnswers[(lengthofobject - 1)]) {
        var output = "<div class='output'><h1>Quiz Results</h1><BR>";
        var questionResult = "NA";
        //console.log('Quiz Over');
        for (var i = 0; i < myAnswers.length; i++) {
            if (data[cateId][levelId][i].correct == myAnswers[i]) {
                questionResult = '&nbsp; <i class="fa fa-check correct"></i>';
                correct++;
            } else {
                questionResult = '&nbsp;<i class="fa fa-times wrong"></i>';
            }
            output = output + '<p>Question ' + (i + 1) + ' ' + questionResult + '</p> ';
        }
               var Correct1 = data[cateId][levelId][0].correct;
        var Correct2 = data[cateId][levelId][1].correct;
        var Correct3 = data[cateId][levelId][2].correct;
        var Correct4 = data[cateId][levelId][3].correct;
        var Correct5 = data[cateId][levelId][4].correct;

        output += '<button class="start"><a href="/categories">Play again<i class="fa fa-play-circle-o"></i></a></button><p>Correct answers are : </p> <p style="color:yellowgreen;"> ' + data[cateId][levelId][0].answers[Correct1-1] + ' , ' + data[cateId][levelId][1].answers[Correct2-1] + ' , ' + data[cateId][levelId][2].answers[Correct3-1] + ' , ' + data[cateId][levelId][3].answers[Correct4-1] + ' , ' + data[cateId][levelId][4].answers[Correct5-1] + '</p>';
        output = output + '<p>Hey there , You scored ' + (correct * levelId) + ' points out of ' + (lengthofobject * levelId) + '</p></div> ';
        document.getElementById("q-container").innerHTML = output;

    } else {
        //console.log('not answered');
    }
}

function moveBack() {
    curPage--;
    checkPage(curPage);
}
function checkPage() {
    //add remove disabled buttons 
    if (curPage == 0) {
        btnPrevious.classList.add("hide");
    } else {
        btnPrevious.classList.remove("hide");
    }
    if ((curPage + 1) < (lengthofobject)) {
        btnNext.classList.remove("hide");
        submitBtn.classList.add("hide");
    } else {
        btnNext.classList.add("hide");
        submitBtn.classList.remove("hide");
    }

    var myObj = data[cateId][levelId][curPage];
    // console.log(myObj);
    myHeader.innerHTML = ("Level " + levelId);
    myQuestion.innerHTML = myObj.question;

    newimage.src = myCategoryimages[cateId];

    myAnswerz.innerHTML = "";
    var addSelClass = '';
    console.log(myAnswers);
    // console.log(curPage);
    // console.log(myAnswers[curPage]);
    for (var index in myObj.answers) {

        // console.log(parseInt(index) + 1);
        if (myAnswers[curPage] == (parseInt(index) + 1)) {
            addSelClass = "selectAnswer";
        } else {
            addSelClass = "";
        }
        myAnswerz.innerHTML += '<button class="answer ' + addSelClass + ' "> <a data-id="' + (parseInt(index) + 1) + '" class="answer-btn">' + myObj.answers[index] + '</a> </button>';

    }

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener("click", myAnswer, false);
        // console.log('myAnswers');
    }

    //Update progressBar
    increment = Math.ceil((curPage + 1) / (lengthofobject) * 100);
    progressBar.style.width = (increment) + '%';
    progressBar.innerHTML = (curPage + 1) + ' of ' + lengthofobject;
}

