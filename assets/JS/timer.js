// Select element by class
let timeEl = document.querySelector(".countdownTimer");


//Set game timer length
let secondsLeft = 11;

export function setTime() {
    // Set interval in variable
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Timer: " + secondsLeft;

        if (secondsLeft === 0) {
            //Time Expired Action
            clearInterval(timerInterval);
            gameOver()
        }

    }, 1000);
}

// Function to run at end of game
function gameOver() {
    timeEl.textContent = "Time is Up";
}

setTime();