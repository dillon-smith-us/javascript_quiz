let root = document.querySelector("#root");
let startBTN = document.querySelector("#start");
let questions = [
    "Inside which HTML element do we put the JavaScript?",
    "Javascript is the same as Java",
    "What will the following code return?: Boolean(10 > 9)",
    "Is Javascript case sensitive?",
    "Which event occurs when the user clicks on an HTML element?"
];

// arrays for options of multiple choice answers
let arrays = [[
        "<script>",
        "<js>",
        "<scripting>",
        "<java>"
    ], [
        "yes",
        "no",
        "maybe",
        "I don't know"
    ], [
        "true",
        "false",
        "NaN",
        "incorrect"
    ], [
        "yes",
        "no",
        "maybe",
        "I don't know"
    ] [
        "onclick",
        "onmouseclick",
        "onchange",
        "onmouseover"
    ]
];

// the correct answers to multiple choice questions as a boolean array
let correct = [[
        true, false, false, false
    ], [
        false, true, false, false
    ], [
        true, false, false, false    
    ], [
        true, false, false, false
    ], [
        true, false, false, false
    ]   
]

// declaring variables

let options = [
    document.createElement("BUTTON"), 
    document.createElement("BUTTON"),
    document.createElement("BUTTON"),
    document.createElement("BUTTON")];
let time = 120;
let questionNumber = 1;
let randomVariable;
let prompty = 120;
let HighScoreView = false;
let timeEl = document.querySelector("#time");
let displayHighScores = document.querySelector("#displayHighScores");
let pEl = document.createElement("p");
let inputEl = document.createElement("input");
let sectionEl = document.createElement("section");
let submitButton = document.createElement("BUTTON");
let ulEl = document.createElement("ul")
let message = document.createElement("p")
let resetHighScore = document.createElement("BUTTON")
let resetSubmitButton = document.createElement("p")
if (JSON.parse(localStorage.getItem("highScores")) === null) {
     localStorage.setItem("highScores", JSON.stringify([]));
}


let highScores = JSON.parse(localStorage.getItem("highScores"))
pEl.textContent = " Enter initials ";
submitButton.textContent = "submit";
pEl.setAttribute("style", "margin-right: 10px; width: fit-content;")
inputEl.setAttribute("style", "position: relative; left: 125px; top: -19px; height: 20px");
submitButton.setAttribute("style", "position: relative; left: 125px; top: -19px; margin-top: 0px;");
sectionEl.setAttribute("style", "display: none; margin: 10px; margin-left: 20%; height: 15px;");
resetHighScore.setAttribute("style", "display: none;");
resetSubmitButton.setAttribute("style", "display: none;");
message.setAttribute("style", "display: block; color: yellowgreen;");
root.appendChild(ulEl);
root.appendChild(resetHighScore);
root.appendChild(resetSubmitButton);
sectionEl.appendChild(pEl);
sectionEl.appendChild(inputEl);
sectionEl.appendChild(submitButton);
resetHighScore.textContent = "reset highscores"
resetSubmitButton.textContent = "try again"
for (i in options) {
    root.appendChild(options[i]);
        options[i].setAttribute("style", "display: none;");
        options[i].setAttribute("id", (parseInt(i) + 1).toString());
        options[i].setAttribute("class", "answers")
}
root.appendChild(message);

function reset() {
    time = 120;
    timeEl.textContent = time;
    questionNumber = 1;
    root.setAttribute("style", "display: flex;");
    root.children[0].setAttribute("style", "align-self: center; margin-left: 0px;");
    root.children[0].textContent = " ";
    let stringVar = "Answer the following javascript questions to the best of your ability within the time limit of 120 seconds.<br> If a question is answered incorrecty, you will be penalized time."
    root.children[1].innerHTML = stringVar;
    root.children[1].setAttribute("style", "display: block;");
    root.children[2].setAttribute("style", "display: block;");
    resetHighScore.setAttribute("style", "Display: none;")
    resetSubmitButton.setAttribute("style", "display: none;");
    ulEl.setAttribute("style", "display: none;");
    highScores = JSON.parse(localStorage.getItem("highScores"));
    HighScoreView = false;
    inputEl.value = "";
    prompty = 2;
}

function intervals() {
    let interval = setInterval(function() {
        if (!((questionNumber - 1) < questions.length) || HighScoreView) {
            timeEl.textContent = time;
            message.setAttribute("style", "display: none;");
            clearInterval(interval);
            return;
        }
        if ((prompty - time) === 2) {
            message.setAttribute("style", "display: none;");
        }

        if (time <= 0) {
            time = 0
            timeEl.textContent = time;
            message.setAttribute("style", "display: none;");
            zero();
            clearInterval(interval);
            return;
        } else {
            time--;
            timeEl.textContent = time;
        }

    }, 1000);
}

function showHighScores() {
    root.setAttribute("style", "display: block;");
    root.children[0].textContent = "Highscores";
    root.children[0].setAttribute("style", "text-align: left; margin-left: 20%;");
    root.children[1].setAttribute("style", "display: none;");
    message.setAttribute("style", "display: none;");
    sectionEl.setAttribute("Style", "display: none;");
    if (JSON.parse(localStorage.getItem("highScores")) === null) {
        localStorage.setItem("highScores", JSON.stringify([]));
    }
    randomVariable = JSON.parse(localStorage.getItem("highScores"))
    randomVariable.sort(function(a, b) {
        return b.scores - a.scores
    });

    for (i in randomVariable) {
        ulEl.appendChild(document.createElement("li"));
        ulEl.children[i].textContent = (parseInt(i) + 1) + "." + randomVariable[i]["names"] + " - " + randomVariable[i]["scores"];
        ulEl.setAttribute("style", "background: green; width: 50%; margin-left: 20%; margin-top 15px;")
    }
    resetHighScore.setAttribute("style", "display: block; margin-left: 20%; position: relative; top: -3px; 150px");
    resetSubmitButton.setAttribute("style", "display: block: margin-left: 20%; margin-right: 20px; position: relative; top: -35px;");
    for (i in options) {
        options[i].setAttribute("style", "display: none;");
    }
    highScoreView = true;
}

function zero() {
    root.children[0].textContent = "TIMES UP";
    for (i in options) {
        options[i].setAttribute("style", "display: none;");
    }
    resetSubmitButton.setAttribute("style", "display: block; margin-left: 20%;")
    resetSubmitButton.textContent = "try again"
}

function initials() {
    root.children[0].textContent = ("Quiz complete.");
    root.children[1].textContent = ("Score: " + time + " points!");
    root.children[1].setAttribute("style", "display: block; text-align: left; margin-left: 20%;")
    sectionEl.setAttribute("style", "margin-left: 20%; margin-top: 20px; display: inline-block;")
    for (i in options) {
        options[i].setAttribute("style", "display: none");
    }
}

function nextQ() {
    questionNumber++;
    if (((questionNumber - 1) < questions.length) && (time !=0)) {
        askQ();
    } else if(time <= 0) {
        time = 0;
        zero();
    } else {
        message.setAttribute("style", "display: none")
        initials();
    }
    return;
}

function answerCheck(element) {
    if ((questionNumber - 1) < questions.length) {
        if (correct[questionNumber - 1][parseInt(element.id) - 1]) {
            message.textContent = "Right! "
            message.setAttribute("style", "display: block; text-align: left: margin-left: 20%; margin-top: 30px; padding-top: 8px; border-top: 2px solid green;");
            prompty = time + 1;
        } else {
            time -= 10;
            timeEl.textContent = time + 1;
            prompty = time;
            message.textContent = "Wrong! "
            message.setAttribute("style", "display: block; text-align: left; margin-left: 20%; margin-top: 30px; padding-top: 8px; border-top: 2px solid green;"); 
        }
        nextQ();
    } return;
}

function askQ() {
    root.children[0].textContent = questions[questionNumber - 1];
    for (i in options) {
        options[i].textContent = (parseInt(i) + 1) + "." + arrays[questionNumber - 1][i];
        options[i].setAttribute("style", `position: relative; top: ${(20 + "px")}; display: block; width: fit-content;`)
    }
    return;
}

function start() {
    root.children[0].setAttribute("style", "align-self: flex-start; margin-left: 20%;");
    root.children[1].setAttribute("style", "display: none;");
    root.children[2].setAttribute("style", "display: none;");
    root.setAttribute("style", "display: block;")
    askQ();
    intervals();
    return;
}


// declare event listeners

startBTN.addEventListener("click", start)

root.addEventListener("click", function(event) {
    let element = event.target;
    if (element.matches(".answers")) {
        answerCheck(element);
    }
})

submitButton.addEventListener("click", function() {
    let object1 = {
        names: inputEl.value,
        scores: time
    };
    highScores.push(object1);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
})

displayHighScores.addEventListener("click", showHighScores)

resetHighScore.addEventListener("click", function() {
    localStorage.setItem("highScores", JSON.stringify([]));
    highScores = [];
    for (i in randomVariable) {
        ulEl.children[i].textContent = " ";
    }
    console.log(ulEl)
    ulEl.setAttribute("style", "display: none;");
})

resetSubmitButton.addEventListener("click", reset);

