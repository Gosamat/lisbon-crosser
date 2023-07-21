// Variables for each button so we can easily call them.
let playButton = document.getElementById('play-button');
let howToPlayButton = document.getElementById('how-to-play-button');
let dontPlayButton = document.getElementById('dont-play-button');
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

    // Check if the pressed key belongs to the array of possible keys
    if(possibleKeystrokes.includes(key)){
      // Prevent the default actions from happening
      // in this case, it's the scroll-up,-down,-left,-right in the browser window
      event.preventDefault();

      // Only when we have a game loaded, we can move the player
      if(game){
        switch(key){
          case "ArrowLeft":
          game.player.left = -25;
          break;
          
          case "ArrowUp":
          game.player.top = -25;
          break;

          case "ArrowRight":
          game.player.left = 25;
          break;

          case "ArrowDown":
          game.player.top = 25;
          break;

        }
      }

    }
  }