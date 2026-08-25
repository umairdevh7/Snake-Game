
let game = document.querySelector(".game");
let snake = document.querySelector(".snake");
let food = document.querySelector(".food");
let btn = document.querySelector(".new-game");
let scoreText = document.querySelector(".scc");

let gameOverScreen = document.querySelector(".game-over");
let finalScore = document.querySelector(".final-score");
let playAgain = document.querySelector(".play-again");
let highScoreText = document.querySelector(".high-score");

let snakeParts = [];
let score = 0;
let direction = "right";
let gameRunning = false;
let gameLoop;

let highScore = localStorage.getItem("highScore") || 0;
highScoreText.innerHTML = `High Score: ${highScore}`;


// START GAME
btn.addEventListener("click", function () {

    // Reset game
    clearInterval(gameLoop);
    gameRunning = true;
    score = 0;
    direction = "right";

    scoreText.innerHTML = "Score: 0";
    gameOverScreen.style.display = "none";

    // Remove old body
    document.querySelectorAll(".snake-body").forEach(function (body) {
        body.remove();
    });

    // Random starting position
    let x = Math.floor(Math.random() * 20) * 31;
    let y = Math.floor(Math.random() * 13) * 31;

    snakeParts = [{ x: x, y: y }];

    snake.style.display = "block";
    snake.style.width = "31px";
    snake.style.left = x + "px";
    snake.style.top = y + "px";

    createFood();

    // Start automatic movement
    gameLoop = setInterval(moveSnake, 400);
});


// PLAY AGAIN
playAgain.addEventListener("click", function () {
    btn.click();
});


// CREATE FOOD
function createFood() {

    let x = Math.floor(Math.random() * 20) * 31;
    let y = Math.floor(Math.random() * 13) * 31;

    food.style.display = "block";
    food.style.left = x + "px";
    food.style.top = y + "px";
}


// CREATE BODY PART
function addSnakePart() {

    let body = document.createElement("div");

    body.classList.add("snake-body");

    game.appendChild(body);
}


// SHOW BODY
function drawSnakeBody() {

    let bodies = document.querySelectorAll(".snake-body");

    bodies.forEach(function (body, index) {

        body.style.left = snakeParts[index + 1].x + "px";
        body.style.top = snakeParts[index + 1].y + "px";

    });
}

// GAME OVER
function gameEnd() {

    gameRunning = false;
    clearInterval(gameLoop);

    gameOverScreen.style.display = "flex";
    finalScore.innerHTML = `Score: ${score}`;
}


// ARROW KEYS
document.body.addEventListener("keydown", function (e) {

    if (!gameRunning) return;

    if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }

    if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }

    if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }

    if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
});


// MOVE SNAKE
function moveSnake() {

    let head = snakeParts[0];

    let newX = head.x;
    let newY = head.y;


    // Move head
    if (direction === "right") newX += 31;
    if (direction === "left") newX -= 31;
    if (direction === "up") newY -= 31;
    if (direction === "down") newY += 31;


    // Wall collision
    if (
        newX < 0 ||
        newY < 0 ||
        newX + 31 > game.clientWidth ||
        newY + 31 > game.clientHeight
    ) {
        gameEnd();
        return;
    }


    // Body collision
    for (let i = 1; i < snakeParts.length; i++) {

        if (
            newX === snakeParts[i].x &&
            newY === snakeParts[i].y
        ) {
            gameEnd();
            return;
        }
    }


    // Check food
    let foodX = parseInt(food.style.left);
    let foodY = parseInt(food.style.top);

    let ateFood = newX === foodX && newY === foodY;


    // Move body
    for (let i = snakeParts.length - 1; i > 0; i--) {

        snakeParts[i] = {
            x: snakeParts[i - 1].x,
            y: snakeParts[i - 1].y
        };

    }


    // Move head
    snakeParts[0] = {
        x: newX,
        y: newY
    };


    // If food eaten
    if (ateFood) {

        let tail = snakeParts[snakeParts.length - 1];

        snakeParts.push({
            x: tail.x,
            y: tail.y
        });


        addSnakePart();

        score++;

        scoreText.innerHTML = `Score: ${score}`;


        if (score > highScore) {

            highScore = score;

            localStorage.setItem("highScore", highScore);

            highScoreText.innerHTML = `High Score: ${highScore}`;
        }


        createFood();
    }


    // Draw head
    snake.style.left = newX + "px";
    snake.style.top = newY + "px";


    // Draw body
    drawSnakeBody();
}

