let canvas = document.getElementById('snake'); 
let context = canvas.getContext('2d');

let dimension = 20;
let box = 20;
let speed = 400;
canvas.width = dimension * box;
canvas.height = dimension * box;

let snake = []; 
snake[0] = {
    x: dimension / 2 * box,
    y: dimension / 2 * box
};
let direction = 'right';

let food = {};

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
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
    refreshGame();
}

function refreshGame(){
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
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game Over');
        }
    }

    drawBackground();
    drawSnake();
    drawFood();
}

document.addEventListener('keydown', keyPressed);
newFood();
let game = setInterval(refreshGame, speed);
