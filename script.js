let game = document.querySelector('.game');
let snake = document.querySelector('.snake');
let food = document.querySelector('.food');
let btn = document.querySelector('.new-game');

btn.addEventListener('click', function () {

    let cellSize = 31
    let snakeLength = 31
    let columns = Math.floor(game.clientWidth / cellSize)
    let rows = Math.floor(game.clientHeight / cellSize)

    let randomColumn = Math.floor(Math.random() * columns)
    let randomRow = Math.floor(Math.random() * rows)

    let randomX = randomColumn * cellSize
    let randomY = randomRow * cellSize


    snake.style.display = 'block'
    snake.style.left = randomX + "px"
    snake.style.top = randomY + "px"
    snake.style.width = snakeLength + 'px'
    createFood()




});

function createFood() {
    let cellSize = 31
    let columns = Math.floor(game.clientWidth / cellSize)
    let rows = Math.floor(game.clientHeight / cellSize)
    let foodColumn = Math.floor(Math.random() * columns)
    let foodRow = Math.floor(Math.random() * rows)

    let randomFoodX = foodColumn * cellSize
    let randomFoodY = foodRow * cellSize
    food.style.display = 'block'
    food.style.left = randomFoodX + "px"
    food.style.top = randomFoodY + "px"
}



document.body.addEventListener('keydown', function (elem) {
    let snakeX = parseInt(getComputedStyle(snake).left)
    let snakeY = parseInt(getComputedStyle(snake).top)

    let foodX = parseInt(getComputedStyle(food).left)
    let foodY = parseInt(getComputedStyle(food).top)

    if (elem.key === 'ArrowLeft') snakeX -= 31
    if (elem.key === 'ArrowRight') snakeX += 31
    if (elem.key === 'ArrowUp') snakeY -= 31
    if (elem.key === 'ArrowDown') snakeY += 31

    snake.style.left = snakeX + 'px'
    snake.style.top = snakeY + 'px'

    food.style.left = foodX + 'px'
    food.style.top = foodY + 'px'

    if (snakeX === foodX && snakeY === foodY) {
        let snakeLength = snake.clientWidth

        snakeLength += 31
        snake.style.width = snakeLength + 'px'
        createFood()


    }


})
