class Game {
    constructor(){
        // Variables to later refer to the different possible screens of the webpage
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.endScreen = document.getElementById('end-screen');
        this.gameContainer = document.getElementById ('game-container');


        // Creating Prize/victory area
        this.getPrize = new GetPrize (this.gameScreen);

        this.depositPrize = new DepositPrize (this.gameScreen);

        // Creating the player property
        this.player = new Player(this.gameScreen, 300, 600, 50, 50);


        this.height = 650;
        this.width = 650;
        
        // gameScreen will by default have 0x0 until we run the start function which will give it the height and width specified within the constructor
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

         // game over flag
         this.gameIsOver = false;

        //  Check to see if Player got prize from prize area
         this.prizeInHand = false;
        
       
        
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

        this.player.stayInPlay();
        console.log("updating");

        // Check if player got the prize
        if (this.player.gotPrize(this.getPrize)){
            // When player reaches prize area, the property turns true.
            this.prizeInHand = true;
            console.log("prize in hand");
        }

        // Check if player deposited the prize
        if (this.prizeInHand === true && touchDepositArea(this.depositPrize) === true){
            // When player reaches the deposit area, remove prize in hand aka becomes false and add to total score.
            this.prizeInHand = false;
            console.log("Deposited Prize");
        }



    }

    // This function will take the player to the How-to page

    // This function will display the "joke" don't play page





}