class Game {
    constructor(){
        // Variables to later refer to the different possible screens of the webpage
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.endScreen = document.getElementById('end-screen');
        this.gameContainer = document.getElementById ('game-container');

        // Creating the player property
        this.player = new Player(this.gameScreen, 275, 640, 50, 50);

        this.height = 700;
        this.width = 600;
        
        // gameScreen will by default have 0x0 until we run the start function which will give it the height and width specified within the constructor
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

         // game over flag
         this.gameIsOver = false;
        
       
        
    }
    // This function will start the game
    start(){        
        // Change the correct "windows" to display and to disappear
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameContainer.style.display = 'block';

        // Run the gameloop to make the g
        this.gameLoop();
    }

    gameLoop(){
        console.log('Game Loop');

        // check if the game is over to interrupt the game loop
        if(this.gameIsOver){
            return;
        } 

        this.update();

        window.requestAnimationFrame(()=>this.gameLoop());
    }

    update (){

        this.player.updatePosition();
    }

    // This function will take the player to the How-to page

    // This function will display the "joke" don't play page





}