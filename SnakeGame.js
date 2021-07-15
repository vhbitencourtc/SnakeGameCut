let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

//Renderizando o desenho 2D;
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
//Definindo a direção da Cobrinha
let direction = "right";
//Definindo a direção da comida
let food ={
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}
//Função Criação do Background
function createBG() {

  //Definindo a Cor Campo
  context.fillStyle = "lightgreen";

  //Desenhando o Game. Posição de X, Y e Z
  //32 * box é o tamanho da Caixa
  context.fillRect(0, 0, 16*box, 16*box);
}

//Função Criando a Cobrinha
function createSnake() {
  for (i = 0; i < snake.length; i++){

    //Definindo a cor da cobra
    context.fillStyle = "green";

    //Definindo o posicionamento da cobra do campo
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

//Função Criando a Comida da Cobrinha
function createFood (){
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

//Criando o evento de movimento via Teclado
document.addEventListener('keydown', update);

function update(event){
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'rigth';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

//Função PlayGame
function playGame(){

  //Definido o campo de movimentação da cobra, para que possa ultrapassar as paredes, sem morrer ou bugar o game
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0
  if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

  //Criando a condição caso a Cobrinha toque em seu proprio corpo, exibi fim de game.
  for(i= 1; i < snake.length; i++){
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
    cleanerInterval(game);
    alert("Game Over :(");
    }
  }

  //Chamando a função BG e Cobrinha
  createBG();
  createSnake();
  createFood();

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  //Criando as condições de movimentação da Cobra
  if (direction == "rigth") snakeX += box
  if (direction == "left") snakeX -= box
  if (direction == "up") snakeY -= box
  if (direction == "down") snakeY += box

  if(snakeX != food.x || snakeY != food.y){
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  //Definindo a Cabeça da Cobra
  snake.pop();
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);
}

//Definindo o ínicio do Game
let game = setInverval(playGame, 100)
