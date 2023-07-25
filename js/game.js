class Game {
    constructor(){

        // TO DO
        // Make function to display other page for the How-To button
        // Make function to display other "joke" page
        // Make a credit page/section for any used assets.

        ////////////////////////////////////////////////////////////

        // Variables to later refer to the different possible screens of the webpage
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.endScreen = document.getElementById('end-screen');
        this.gameContainer = document.getElementById ('game-container');

        // Creating Prize/victory zone property
        this.getPrize = new GetPrizeZone (this.gameScreen);

        // Variable for frame count
        this.frameCount = 0;
        
        // Creating Deposit zone property
        this.depositPrize = new DepositPrizeZone (this.gameScreen);

        // Creating the player property
        this.player = new Player(this.gameScreen, 300, 600, 50, 50,"./images/test.png");

        // Player's life system
        this.lives = 3;

        // Player's score system
        this.score = 0;

        // Creating the obstacles properties/arrays

        this.obstaclesArray = [];

        //define the height and width we want to apply to the gameScreen once game is running 
        // this.height = 650;
        // this.width = 650;
        
        // gameScreen will by default have 0x 
        // When variable game is assigned to Game class and initialized, the gameScreen will have the height and width defined above.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

         // game over flag
         this.gameIsOver = false;

        //  Check to see if Player got prize from prize area
         this.prizeInHand = false;
         

    }

    // function to start the game
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
        this.frameCount ++;
    }

    update (){

        this.player.stayInPlay();
        // console.log("updating"); // just for tests


        // console.log(this.prizeInHand); // just for tests

        // Check if player got the prize
        if (this.player.gotPrize(this.getPrize)){

            // When player reaches prize area, the property turns true.
            this.prizeInHand = true;

            // console.log("prize in hand"); // just for tests

        }
        
            // Check for collision and if an obstacle is still on the screen
            for (let j = 0; j <this.obstaclesArray.length; j++){

                // Grabbing an obstacle and moving it downwards
                const obstacle = this.obstaclesArray[j];
                obstacle.move();

                // Check if the player collided with an obstacle
                if (this.player.didCollide(obstacle)){
                    // What happens when player hits obstacle
                    this.player.left = 300;
                    this.player.top = 600;
    
                    // Reduce player's life by 1
                    this.lives--;
    
                }
                // Check if the obstacle is off the screen ( at the bottom)
                else if(obstacle.left < -100 || obstacle.left+obstacle.width > 750){
                    // Remove the obstacle from the HTML
                    obstacle.element.remove();
    
                    // Remove the object from the array of obstacles
                    this.obstaclesArray.splice(j,1);
    
                }
            }
    
            // Update obstacles spawning for First Line

            if (this.frameCount % 110 === 0 && this.obstaclesArray.length < 3){
    
                this.obstaclesArray.push(new Obstacle(this.gameScreen, 2, 50, 50, 550, 700, "left"));
                console.log (`current frame time is ${this.frameCount}`);
    
            }



        // Check if player deposited the prize
        if (this.prizeInHand === true && this.player.touchDepositArea(this.depositPrize) === true){

            // When player reaches the deposit area, remove prize in hand aka becomes false and add to total score.
            this.prizeInHand = false;
            this.score ++;
            // console.log(`current score is ${this.score}`);

            // console.log("Deposited Prize"); // just for tests

        }



    }

}