let inputDir = { x: 0, y: 0 };

const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");


let speedArr = [2, 5, 8];
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let speed = 2;

let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");

easy.addEventListener("click", function () {
    easy.classList.add("btn-lg");
    medium.classList.remove("btn-lg");
    hard.classList.remove("btn-lg");
    speed = speedArr[0];
});
medium.addEventListener("click", function () {
    easy.classList.remove("btn-lg");
    medium.classList.add("btn-lg");
    hard.classList.remove("btn-lg");
    speed = speedArr[1];
});
hard.addEventListener("click", function () {
    easy.classList.remove("btn-lg");
    medium.classList.remove("btn-lg");
    hard.classList.add("btn-lg");
    speed = speedArr[2];
});

food = { x: 6, y: 7 };

function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;
    gaming();
}


function iscollide(snake) {
    //  if snake collide with himself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if snake collide with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gaming() {

    // Updating the snake and array food
    if (iscollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press OK to play again.");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score : 0";
    }

    // If snake ate the food then increase the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;

        if (score > hiScoreVal) {
            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            hiScoreBox.innerHTML = "HighScore : " + hiScoreVal;
        }

        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // display the snake
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }

        board.appendChild(snakeElement);
    });


    // display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

musicSound.play();

let hiScore = localStorage.getItem("hiScore");

if (hiScore === null) {
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
}
else {
    hiScoreVal = JSON.parse(hiScore);
    hiScoreBox.innerHTML = "HighScore : " + hiScore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        default:
            break;
    }
});

let up = document.getElementById("up");
let left = document.getElementById("left");
let right = document.getElementById("right");
let down = document.getElementById("down");

up.addEventListener("click", function () {
    inputDir.x = 0;
    inputDir.y = -1;
});

left.addEventListener("click", function () {
    inputDir.x = -1;
    inputDir.y = 0;
});

right.addEventListener("click", function () {
    inputDir.x = 1;
    inputDir.y = 0;
});

down.addEventListener("click", function () {
    inputDir.x = 0;
    inputDir.y = 1;
});

let songOn = document.getElementById("songOn");
let songOff = document.getElementById("songOff");

songOn.addEventListener("click", function () {
    musicSound.play();
    songOn.classList.add("btn-lg");
    songOff.classList.remove("btn-lg");
});

songOff.addEventListener("click", function () {
    musicSound.pause();
    songOff.classList.add("btn-lg");
    songOn.classList.remove("btn-lg");
});
