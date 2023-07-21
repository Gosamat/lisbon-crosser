window.onload = function () {
// Variables for each button so we can easily call them.
let playButton = document.getElementById('play-button');
let howToPlayButton = document.getElementById('how-to-play-button');
let dontPlayButton = document.getElementById('dont-play-button');

// Declare the variable that will be the game itself
let game;

// Actions of each created button
playButton.addEventListener('click',function(){
    startGame();
});

howToPlayButton.addEventListener('click',function(){
    startGame();
});

dontPlayButton.addEventListener('click',function(){
    startGame();
});

// function to start the game, assinging the game variable to the Game class and initiating its start() function
function startGame() {
    console.log("start game");
    game = new Game();
    game.start();

  }
  
// function that handles keydown events
function handleKeyDown (event){
const key = event.key;
const possibleKeystrokes = [
    "ArrowLeft",
    "ArrowUp",
    "ArrowRight", 
    "ArrowDown"
]
    // Player movement happens based only on the possible keystrokes
    if(possibleKeystrokes.includes(key)){
      event.preventDefault();

      // player only moves when game is loaded
      if(game){
        switch(key){
          case "ArrowLeft":
          game.player.left += -50;
          break;
          
          case "ArrowUp":
          game.player.top += -50;
          break;

          case "ArrowRight":
          game.player.left += 50;
          break;

          case "ArrowDown":
          game.player.top += 50;
          break;

        }
      }

    }
  } 
    // event listened to grab the input made by the user and translate it into the movement of the character
  window.addEventListener("keydown", handleKeyDown);
 };