let startButton = document.getElementById('start-btn');
let questionContainerElement = document.getElementById('question-container');
let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');
let countE1 = document.querySelector("#count");
let scoreRank = document.querySelector("#rank-form");
let rankInput = document.querySelector("#rank-text");
let rankForm = document.querySelector("#rank-form");
let rankList = document.querySelector("#rank-list");
let rankCountSpan = document.querySelector("#rank-count");
let clearScores = document.getElementById("clear-Scores");
let ranks = [];
let scoreCount = 0;


//Title Of Game
//Set Game Name
let gameName = document.querySelector(".gameTitle");
gameName.innerHTML = "CODE QUIZ";



// Clear values from Local Storage  
clearScores.addEventListener('click', clearPlayerScores)

function clearPlayerScores() {
    window.localStorage.clear();
}


//Game Timer
// Select element by class
let timeEl = document.querySelector(".countdownTimer");
//Set game timer length
let secondsLeft = 121;

export function setTime() {
    // Set interval in variable
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Timer: " + secondsLeft;

        if (secondsLeft <= 0) {
            //Time Expired Action
            //hide game board
            //show player rank entry
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

// Function to run at end of game
function gameOver() {
    timeEl.textContent = "Game Over";
}



// Scoreboard 
function renderRanks() {
  // Clear ranks and update rank count
//   rankList.innerHTML = "";
//  rankCountSpan.textContent = ranks.length;
//    // Render a new li for each player entry
//   for (let i = 0; i < ranks.length; i++) {
//        let rank = ranks[i];
//       let li = document.createElement("li");
//       li.textContent = rank;
//       li.setAttribute("data-index", i);
     //rankList.appendChild(li);
      startButton.classList.remove('hide')
      scoreRank.classList.add("hide")
 //  };
 }

function scoreboardInit() {
  // Get stored ranks from localStorage
  let storedRanks = JSON.parse(localStorage.getItem("playerRanks")) || [];
  // If ranks were retrieved from localStorage, update the ranks array to it
  console.log(storedRanks)
       rankList.innerHTML = storedRanks
      .map(score => {
          return `<li class="high-score">${score.Player}-${score.Score}</li>`;
        }).join("");
  if (storedRanks !== null) {
   
      rankList = storedRanks;

  }
  // This is a helper function that will render ranks to the DOM
  renderRanks();
  rankList.appendChild;

}

function storeRanks() {
  // Stringify and set key in localStorage to todos array
  window.localStorage.setItem("playerRanks", JSON.stringify(ranks));
}

// Add submit event to form
rankForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let rankText = {
      Player: rankInput.value.trim(),
      Score: scoreCount
  };
  rankList.push(rankText);
  window.localStorage.setItem("playerRanks", JSON.stringify(rankText));
  // if rankText is empty string exit function
  if (rankText === "") {
      return;
  }

  // Add new todoText to todos array, clear the input
  ranks.push(rankText);
  rankInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeRanks();
  renderRanks();
});




//PLAY GAME
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
answerButtonsElement.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
 })

function startGame() {


  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
   secondsLeft = 121;
   countE1.textContent = 0;
  setTime();
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    let button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)

  })
}

function resetState() {

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  let selectedButton = e.target
  let correct = selectedButton.dataset.correct
  processResults(correct);
  console.log(correct);
 Array.from(answerButtonsElement.children).forEach(button => {
   })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {


  } else {
    secondsLeft = 0;
    currentQuestionIndex = 0;
    questionContainerElement.classList.add("hide");
    startButton.innerText = 'Restart';
    scoreRank.classList.remove("hide");
  
  }
}

function processResults(isCorrect) {
  if (!isCorrect) {
     secondsLeft = secondsLeft - 15;
    return;
  }
   scoreCount = parseInt(countE1.textContent, 10) || 0;
  //increase point value
  scoreCount = scoreCount + 100;
   countE1.textContent = scoreCount;
   //next question
}

scoreboardInit();

//Create List of questions
let questions = [

  {
      question: 'How do you break within a string?',
      answers: [
          { text: 'Forwardslash', correct: false },
          { text: 'Hashtag', correct: false },
          { text: 'Backslash', correct: true },
          { text: 'Interrobang', correct: false }
      ]
  },
  {
      question: 'Which method remove variables from the end of an array?',
      answers: [
          { text: 'shift()', correct: false },
          { text: 'pop()', correct: true },
          { text: 'unshift()', correct: false },
          { text: 'push()', correct: false }
      ]
  },
  {
      question: 'the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code.',
      answers: [
          { text: 'interpolation', correct: false },
          { text: 'extrapolation', correct: false },
          { text: 'object dominence', correct: false },
          { text: 'Hoisting', correct: true }
      ]
  },
  {
      question: 'What are JavaScript Data Types?',
      answers: [
          { text: 'Number, String, Boolean, Object, Undefined', correct: true },
          { text: 'Function, String, Boolean, Object, Number', correct: false },
          { text: 'HTML, CSS, JS, ASP, jQuery', correct: false },
          { text: 'innerHTML, textarea, select, form, button', correct: false }
      ]
  },
  {
      question: 'What does NaN mean?',
      answers: [
          { text: 'Not a number.', correct: true },
          { text: 'Now a Null', correct: false },
          { text: 'Number as Numerical', correct: false },
          { text: 'Nth of a number ', correct: false }
      ]
  },
  {
      question: 'Which company developed JavaScript?',
      answers: [
          { text: 'Java Ltd', correct: false },
          { text: 'Microsoft Corporation', correct: false },
          { text: 'Apple Corporation', correct: false },
          { text: 'Netscape', correct: true }
      ]
  },
  {
      question: 'a notation resembling a simplified programming language, used in program design.',
      answers: [
          { text: 'javascript', correct: false },
          { text: 'hoisting', correct: false },
          { text: 'pseudocode', correct: true },
          { text: 'key pair', correct: false }
      ]
  },
  {
      question: 'What is the strict equality operator?',
      answers: [
          { text: '+=', correct: false },
          { text: '===', correct: true },
          { text: '==', correct: false },
          { text: '>=', correct: false }
      ]
  },
  {
      question: 'A keyword that refers to the object from where it was called',
      answers: [
          { text: 'Function', correct: false },
          { text: 'Method', correct: false },
          { text: 'Document', correct: false },
          { text: 'This', correct: true }
      ]
  },
  {
      question: 'What is the data type of variables in JavaScript?',
      answers: [
          { text: 'Function data types', correct: false },
          { text: 'Operator data types', correct: false },
          { text: 'Object data types', correct: true },
          { text: 'Typescript data types', correct: false }
      ]
  },
]

