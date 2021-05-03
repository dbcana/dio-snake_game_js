let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');

let dimension = 20;
let box = 20;
canvas.width = dimension * box;
canvas.height = dimension * box;

let speed = 400;
let direction = 'right';
let snake = [];
let food = {};
let game;

function drawBackground(){
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, dimension*box, dimension*box);
}

function drawSnake (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

function newFood(){
    food = {
        x: Math.floor(Math.random() * dimension) * box,
        y: Math.floor(Math.random() * dimension) * box
    }
}

function keyPressed(event){
    if(event.keyCode == 37 && direction != 'right') changeDirection('left');
    if(event.keyCode == 38 && direction != 'down') changeDirection('up');
    if(event.keyCode == 39 && direction != 'left') changeDirection('right');
    if(event.keyCode == 40 && direction != 'up') changeDirection('down');
    if(event.key === '+') increseSpeed();
    if(event.key === '-') decreseSpeed();
}

function changeDirection(dir){
    direction = dir;
    refreshGame();
}

function increseSpeed(){
    if(speed >= 100){
        speed = speed - 50;
        clearInterval(game);
        game = setInterval(refreshGame, speed);
    }
}

function decreseSpeed(){
    if(speed <= 400){
        speed = speed + 50;
        clearInterval(game);
        game = setInterval(refreshGame, speed);
    }
}

function checkColision(){
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game Over');
            resetGame();
        }
    }
}

function checkOverload(){
    if(direction == 'right' && snake[0].x >= dimension * box){
        snake[0].x = 0;
    } 
    if(direction == 'left' && snake[0].x < 0){
        snake[0].x = (dimension - 1) * box;
    }
    if(direction == 'down' && snake[0].y >= dimension * box){
        snake[0].y = 0;
    }
    if(direction == 'up' && snake[0].y < 0){
        snake[0].y = (dimension - 1) * box;
    }
}

function checkMove(){
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        newFood();
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

function refreshGame(){
    checkMove();
    checkOverload();
    checkColision();
    drawBackground();
    drawSnake();
    drawFood();
}

function resetGame(){
    newFood();
    speed = 400;
    snake = []; 
    snake[0] = {
        x: dimension / 2 * box,
        y: dimension / 2 * box
    };
    direction = 'right';
    clearInterval(game);
    game = setInterval(refreshGame, speed);
}

resetGame();
document.addEventListener('keydown', keyPressed);
