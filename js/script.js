window.onload = function () {
// Variables for each button so we can easily call them.
let playButton = document.getElementById('play-button');
let instructionsButton = document.getElementById('instructions-button');
let credtisbutton = document.getElementById('credits-button');
let restartButton = document.querySelectorAll(".restart-button");


// Declare the variable that will be the game itself
let game;

// Actions of each created button
playButton.addEventListener('click',function(){
    startGame();
});

instructionsButton.addEventListener('click',function(){
    instructions();
});

credtisbutton.addEventListener('click',function(){
  cre();
});

for(let i = 0; i<restartButton.length; i++){
  let currentRestartButton = restartButton[i];
  currentRestartButton.addEventListener('click', function (){
    console.log("clicked button")
    location.reload();
  });
}



// function to start the game, assinging the game variable to the Game class and initiating its start() function
function startGame() {
    console.log("start game");
    game = new Game();
    game.start();

  }

function instructions (){
  console.log("instructions");
  let instructionsScreen = document.getElementById("instructions-screen");
  let startScreen = document.getElementById("start-screen");
  startScreen.style.display = "none";
  instructionsScreen.style.display = "block";

}

function credits (){
  console.log("credits");
  let creditsScreen = document.getElementById("credits-screen");
  let startScreen = document.getElementById("start-screen");
  startScreen.style.display = "none";
  creditsScreen.style.display = "block";

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
      if(game && !game.prizeInHand){
        switch(key){
          case "ArrowLeft":
          game.player.left += -50;
          game.player.element.src = "/images/characterLeft.png";
          break;
          
          case "ArrowUp":
          game.player.top += -50;
          game.player.element.src = "/images/characterBack.png"
          break;

          case "ArrowRight":
          game.player.left += 50;
          game.player.element.src = "/images/characterRight.png"
          break;

          case "ArrowDown":
          game.player.top += 50;
          game.player.element.src = "/images/character.png"
          break;

        }
      }
      if(game && game.prizeInHand){
        switch(key){
          case "ArrowLeft":
          game.player.left += -50;
          game.player.element.src = "/images/characterLeftPastel.png";

          break;
          
          case "ArrowUp":
          game.player.top += -50;
          game.player.element.src = "/images/characterBackPastel.png"

          break;

          case "ArrowRight":
          game.player.left += 50;
          game.player.element.src = "/images/characterRightPastel.png"

          break;

          case "ArrowDown":
          game.player.top += 50;
          game.player.element.src = "/images/characterPastel.png"

          break;

        }
      }

    }
  } 
    // event listened to grab the input made by the user and translate it into the movement of the character
  window.addEventListener("keydown", handleKeyDown);
 };