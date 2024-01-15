let score = 0; // Variable to store the player's score
let hitNum = 0; // Variable to store the randomly generated number to hit
let time = 30; // Variable to store the time remaining in seconds

let highScore = localStorage.getItem('highScore') || 0; // Retrieve the high score from local storage or set it to 0 if it doesn't exist

/**
 * Function to increase the player's score by 10 and update the score display
 */
function increaseScore() {
    score += 10;
    document.querySelector('#score').innerHTML = score;
}

/**
 * Function to generate a new random number to hit and update the hit display
 */
function getNewHit() {
    hitNum = Math.floor(Math.random() * 10);
    document.querySelector('#hit').innerHTML = hitNum;
}

/**
 * Function to generate bubbles inside a container element depending on screen size
 */
function makeBubble() {
    const container = document.querySelector('#pbtm');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const bubbleSize = 60;
    const margin = 10;
    const bubblesPerRow = Math.floor((containerWidth - margin) / (bubbleSize + margin));
    const bubblesPerColumn = Math.floor((containerHeight- margin) / (bubbleSize + margin));
    const totalBubbles = bubblesPerColumn * bubblesPerRow;

    console.log("Bubbles Per Row:", bubblesPerRow);
    console.log("Bubbles Per Column:", bubblesPerColumn);

    let clutter = "";
    for (let i = 1; i <= totalBubbles; ++i) {
        const rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }

    container.innerHTML = clutter;
}

let timerInterval;

/**
 * Function to start the timer and update the timer display
 */
function timer() {
    timerInterval = setInterval(() => {
        if (time > 0) {
            time = time - 1;
            document.querySelector('#timer').innerHTML = time;
        } else {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

/**
 * Function to reload the page when the 'x' key is pressed
 */
function reloadPage() {
    location.reload();
}

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'x') {
        reloadPage();
    }
});

document.querySelector('#pbtm').addEventListener("click", (details) => {
    const check = Number(details.target.textContent);
    if (check === hitNum) {
        updateHighScore();
        increaseScore();
        makeBubble();
        getNewHit();
    }
});

/**
 * Function to update the high score display
 */
function updateHighScore() {
    document.querySelector('#highscore').innerHTML = highScore;
}

/**
 * Function to set a new high score if the current score is higher than the previous high score
 */
function setNewHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        updateHighScore();
    }
}

/**
 * Function to end the game and display the game over screen
 */
function gameOver() {
    if (highScore === 0) { // If the high score is 0, set it to the current score
        highScore = score;
    }    
    setNewHighScore();
    updateHighScore();
    const over = `<div id="over"><h1>Game Over<br>SCORE: ${score}<br>High Score: ${highScore}</h1></div>`;
    document.querySelector('#pbtm').outerHTML = over;
    document.querySelector('#hit').innerHTML = 'X';
    
}

updateHighScore(); // Initialize the high score display
makeBubble(); // Generate the initial set of bubbles
timer(); // Start the timer
