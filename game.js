let car = document.querySelector('#car');
let hurdle = document.querySelector('#hurdle');
let count = 0;
let inAir = false;
let highscore = localStorage.getItem('highscore') || 0
let gameover = document.querySelector('#gameOver');
let game = document.querySelector('#game');
let lastScore = document.querySelector('.lastScore');
let restart = document.getElementById('restart')
const storedHighscore = localStorage.getItem('highscore');
if (storedHighscore) {
    highscore = parseInt(storedHighscore);
    document.querySelector('.highScoreBox').innerText = `Highest Score: ${highscore}`;
}

// Jump function

document.querySelector('body').addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !inAir) {
        inAir = true;
        car.classList.add('jump');

        setTimeout(() => {
            car.classList.remove('jump');
            if (!checkCollision()) {
                count++;
                let score = document.querySelector('.scoreBox')
                score.innerText = `Current Score: ${count}`

                if (count > highscore) {
                    highscore = count;
                    localStorage.setItem('highscore', highscore);
                    document.querySelector('.highScoreBox').innerText = `Highest Score: ${highscore}`;
                }
                console.log(`Successful jumps: ${count}`);
            }
            inAir = false;
        }, 1010);
    }
});

function checkCollision() {
    const carRect = car.getBoundingClientRect();
    const hurdleRect = hurdle.getBoundingClientRect();

    if (carRect.right > hurdleRect.left &&
        carRect.left < hurdleRect.right &&
        carRect.bottom > hurdleRect.top &&
        carRect.top < hurdleRect.bottom) {
        gameover.classList.remove('d-none')
        game.classList.add('d-none')
        lastScore.innerText = `Current Score: ${count}`
        return true;
    }
    return false;
}

function collisionLoop() {
    if (!inAir) {
        checkCollision();
    }
    requestAnimationFrame(collisionLoop);
}

// Start the collision detection loop
collisionLoop();

// restart
restart.addEventListener('click', () => {
    gameover.classList.add('d-none');
    game.classList.remove('d-none');
    count = 0; // Reset the count to zero
    document.querySelector('.scoreBox').innerText = `Current Score: ${count}`; // Update the score display
});