class Game {
    constructor(){

        // Variables to later refer to the different possible screens of the webpage
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.endScreen = document.getElementById('end-screen');
        this.instructionsScreen = document.getElementById('instructions-screen');
        this.creditsScreen = document.getElementById('credits-screen');
        this.victoryScreen = document.getElementById('victory-screen');
        this.gameContainer = document.getElementById ('game-container');

        // Creating the zone property where the player acquires the prize
        this.getPrize = new GetPrizeZone (this.gameScreen);

        // Variable for frame count
        this.frameCount = 0;
        
        // Creating prize deposit zone property
        this.depositPrize = new DepositPrizeZone (this.gameScreen);

        // Player's life system
        this.lives = 3;

        // Controls of the gamespeed
        this.gamespeed = 1;

        // Player's score system
        this.score = 0;

        // Visual queue for the score
        this.scoreArray = [];

        // Game State Boolean
        this.gameIsOver = false;

         // game over flag
         this.gameIsOver = false;

        //  Check to see if Player got prize from prize area
         this.prizeInHand = false;
         
        // Creating the player property
        this.player = new Player(this.gameScreen, 300, 600, 50, 50);

        //might be deprecated, UNSURE
        // Tracker if player is on top of an obstacle)
        // this.playerInObstacle = false;


        // Create the obstacles array of arrays
        this.obstaclesArray = [[], [], [], [], [], [], [], [], [], [], []];

        //define the height and width we want to apply to the gameScreen once game is running 
        this.height = 650;
        this.width = 650;
        
        // gameScreen will by default have 0x 
        // When variable game is assigned to Game class and initialized, the gameScreen will have the height and width defined above.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
    }

    // Method to start the game
    start(){     

        // Change the  "windows" to display and to disappear
        this.startScreen.style.display = 'none';
        this.endScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameContainer.style.display = 'block';

        // Run the gameloop
        this.gameLoop();
    }

    // Method of the gameloop
    gameLoop(){
        

        // checks if the game is over to interrupt the game loop, else is just runs the update method
        if(this.gameIsOver){
            return;
        } 

        this.update();

        // javascript magic to make animations and the game update via frames
        window.requestAnimationFrame(()=>this.gameLoop());
        // increased the frameCount variable by 1 each time it loops so we can store the current frame as the game is being played
        this.frameCount ++;
    }

    // Method that handles the first 5 rows of obstacles (aka the cars)
    // It handles spawns (pushing to obstaclesArray), collision with player and removal of obstacles once they are outside of specified boundaries. 
    updateGroupObjectsGround(arr, order){

        // Check for collision and position of each obstacle in the given array
        for (let j = 0; j < arr.length; j++){

            // grabs an obstacle and runs its move method so they actively move throughout the screen
            const obstacle = arr[j];
            obstacle.move();

            // Check if the player collided with an obstacle
            if (this.player.didCollide(obstacle)){

                // player returns to his starting position
                this.player.left = 300;
                this.player.top = 600;

                // Reduce player's life by 1
                this.lives--;
                // player loses the prize if he was carrying it
                this.prizeInHand = false;

            }

            // Check if the obstacle is beyond the given boundaries (either left or right)
            else if(obstacle.left < -100 || obstacle.left+obstacle.width > 750){

                // Remove the obstacle from the HTML
                obstacle.element.remove();

                // Remove the object from the array
                this.obstaclesArray[order].splice(j,1);

            }
        }

        // with the method parameter "order", we specify which object we want to push at a given time and which array inside the main array do we want to push it to.
        // we can control in with frame interval each obstacle spawns in their respective row and the max amount of objects per row
        if (order == 0){
            if (this.frameCount % 110 / (this.gamespeed*100)  === 0 && this.obstaclesArray[0].length < 3){
                this.obstaclesArray[0].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 50, 550, 700, "left", "./images/Car1-test2-green.png"));
            }
        }
        else if(order == 1){
            if (this.frameCount % 130 / (this.gamespeed*100)  === 0 && this.obstaclesArray[1].length < 3){ 
                this.obstaclesArray[1].push(new Obstacle(this.gameScreen, 1.5 * this.gamespeed, 50, 50, 500, -100, "right", "./images/Car1-test2.orange.png"));
            }
        }

        else if(order == 2){
            if (this.frameCount % 130 / (this.gamespeed*100)  === 0 && this.obstaclesArray[2].length < 3){ 
                this.obstaclesArray[2].push(new Obstacle(this.gameScreen, 2.5 * this.gamespeed, 50, 50, 450, 700, "left", "./images/Car1-test2-blue2.png"));
            }
        }

        else if(order == 3){
            if (this.frameCount % 200 / (this.gamespeed*100)  === 0 && this.obstaclesArray[3].length < 3){ 
                this.obstaclesArray[3].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 50, 400, -100, "right", "./images/Car1-test2-yellow.png"));
            }
        }

        else if(order == 4){
            if (this.frameCount % 130 / (this.gamespeed*100)  === 0 && this.obstaclesArray[4].length < 3){ 
                this.obstaclesArray[4].push(new Obstacle(this.gameScreen, 3.5 * this.gamespeed, 50, 100, 350, 650, "left", "./images/truck1.png"));
            }
        }
    }

    // Method that handles the last 5 rows of obstacles (aka the trunks)(pain in the butt to finally get right)
    // It handles spawns (pushing to obstaclesArray), collision with player and removal of obstacles once they are outside of specified boundaries. 
    updateGroupObjectsWater(arr, order, obstaclesArray) {

        // Check for collision and position of each obstacle in the given array
        for (let j = 0; j < arr.length; j++) {
            
        // grabs an obstacle and runs its move method so they actively move throughout the screen
          const obstacle = arr[j];
          obstacle.move();
      
       // Check if the obstacle is beyond the given boundaries (either left or right)
        if(obstacle.left < -200 || obstacle.left+obstacle.width > 850){

        // Remove the obstacle from the HTML
        obstacle.element.remove();

        // Remove the object from the array
        this.obstaclesArray[order].splice(j,1);

    }
        }

         // with the method parameter "order", we specify which object we want to push at a given time and which array inside the main array do we want to push it to.
        // we can control in with frame interval each obstacle spawns in their respective row and the max amount of objects per row
        if(order == 5){
            if (this.frameCount % 200 / (this.gamespeed*20) === 0 && this.obstaclesArray[5].length < 3){ 
                this.obstaclesArray[5].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 150, 250, 650, "left", "./images/boatMedium.png"));
            }
        }

        if(order == 6){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[6].length < 3){ 
                this.obstaclesArray[6].push(new Obstacle(this.gameScreen, 1.5 * this.gamespeed, 50, 100, 200, -100, "right", "./images/boat1blue.png"));
            }
        }

        if(order == 7){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[7].length < 3){ 
                this.obstaclesArray[7].push(new Obstacle(this.gameScreen, 2.5 * this.gamespeed, 50, 200, 150, 650, "left", "./images/bigboat1.png"));
            }
        }

        if(order == 8){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[8].length < 3){ 
                this.obstaclesArray[8].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 100, 100, -100, "right", "./images/boat1orange.png"));
            }
        }
        if(order == 9){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[9].length < 3){ 
                this.obstaclesArray[9].push(new Obstacle(this.gameScreen, 3.5 * this.gamespeed, 50, 150, 50, 650, "left",  "./images/boatMedium2.png"));
            }
        }
    }

    // Method that runs each gameloop that ensures that the various systems of the game are updating as the loop goes
    // this applies to score, lives, winning condition, losing condition and collision checks for the water zone.
    update (){

        // Set background to darken when the the gameScreen is running
        if(this.gameScreen.style.display === "block" 
        || this.victoryScreen.style.display === "block" 
        || this.endScreen.style.display === "block" 
        || this.creditsScreen.style.display === "block"
        || this.instructionsScreen.style.display === "block"
        ){
            document.body.style.backgroundImage = "url('./images/Background2.png')";
        }

        // Score and lives system
        let score = document.getElementById('score');
        let lives = document.getElementById('lives');

    
        // End/lose the game if lives are 0
        if(this.lives <= 0){
            this.endGame();
        }


        if(this.score === 5){
            this.victoryGame();
        }

        // Player's method for ensuring it stays inside of the gameScreen's boundaries
        this.player.stayInPlay();

        // Check to see if player has collided with the prize zone
        if (this.player.gotPrize(this.getPrize)){

            // If player did collide, then he will have the prize in hand.
            this.prizeInHand = true;
            this.player.element.src = "/images/characterBackPastel.png";

           
        }

        // Add score to the score array
        if (this.score === 1 && this.scoreArray.length === 0){
            this.scoreArray.push(new Pastel(this.gameContainer, 85, 85, 796, 515,  "./images/pastel.png"));
        }
        if (this.score === 2 && this.scoreArray.length === 1){
            this.scoreArray.push(new Pastel(this.gameContainer, 85, 85, 796, 565,  "./images/pastel.png"));
        }
        if (this.score === 3 && this.scoreArray.length === 2){
            this.scoreArray.push(new Pastel(this.gameContainer, 85, 85, 796, 615,  "./images/pastel.png"));
        }
        if (this.score === 4 && this.scoreArray.length === 3){
            this.scoreArray.push(new Pastel(this.gameContainer, 85, 85, 796, 665,  "./images/pastel.png"));
        }


        
        // Running the methods for the first 5 rows of obstacles (cars)
        this.updateGroupObjectsGround(this.obstaclesArray[0], 0)
        this.updateGroupObjectsGround(this.obstaclesArray[1], 1)
        this.updateGroupObjectsGround(this.obstaclesArray[2], 2)
        this.updateGroupObjectsGround(this.obstaclesArray[3], 3)
        this.updateGroupObjectsGround(this.obstaclesArray[4], 4)
        
        // Running the methods for the first 5 rows of obstacles (trunks)
        this.updateGroupObjectsWater(this.obstaclesArray[5], 5, this.obstaclesArray)
        this.updateGroupObjectsWater(this.obstaclesArray[6], 6, this.obstaclesArray)
        this.updateGroupObjectsWater(this.obstaclesArray[7], 7, this.obstaclesArray)
        this.updateGroupObjectsWater(this.obstaclesArray[8], 8, this.obstaclesArray)
        this.updateGroupObjectsWater(this.obstaclesArray[9], 9, this.obstaclesArray)

        // Test 1 with this method
        let collisionCheck = false;

        if (this.obstaclesArray[5].some(obstacle => this.player.didCollide(obstacle))   
        || this.obstaclesArray[6].some(obstacle => this.player.didCollide(obstacle))
        || this.obstaclesArray[7].some(obstacle => this.player.didCollide(obstacle))
        || this.obstaclesArray[8].some(obstacle => this.player.didCollide(obstacle))
        || this.obstaclesArray[9].some(obstacle => this.player.didCollide(obstacle))) {
            
            collisionCheck = true;
            const collidedObstacle = this.obstaclesArray[5].find(obstacle => this.player.didCollide(obstacle))
            || this.obstaclesArray[6].find(obstacle => this.player.didCollide(obstacle))
            || this.obstaclesArray[7].find(obstacle => this.player.didCollide(obstacle))
            || this.obstaclesArray[8].find(obstacle => this.player.didCollide(obstacle))
            || this.obstaclesArray[9].find(obstacle => this.player.didCollide(obstacle));

            if (collidedObstacle.moveDirection === "left") {
                this.player.left -= collidedObstacle.speed;
            } else if (collidedObstacle.moveDirection === "right") {
                this.player.left += collidedObstacle.speed;
            }
        }
        console.log( collisionCheck);

        if(!collisionCheck 
        && this.player.top >= 50 && this.player.top < 300 ){
            this.player.left = 300;
            this.player.top = 600;
            // Reduce player's life by 1
            this.lives--;
            this.prizeInHand = false;
            collisionCheck = false;
        }

        // Check the amount of player lives to remove a heart image
        if(this.lives === 2){
            document.getElementById("heart-1").style.display = "none";
        }
        else if (this.lives === 1){
            document.getElementById("heart-1").style.display = "none";
            document.getElementById("heart-2").style.display = "none";

        }

        // Check if player has prize in hand and has reached the deposit zone (aka starting zone)
        if (this.prizeInHand === true && this.player.touchDepositArea(this.depositPrize) === true){

            // When player reaches the deposit zone, remove prize in hand, add to total score and increase the overall speed of all obstacles.
            this.prizeInHand = false;
            this.score ++;
            this.gamespeed += 0.2;
            this.player.element.src = "/images/character.png";
            console.log (`Game speed has now been increased to${this.gamespeed}`);
        }

    
    }

    // Method that ends the game
    endGame(){

        // Removes player
        this.player.element.remove();

        // Remove all obstacles from the array of obstacles
        this.obstaclesArray.forEach(array=>{

            array.forEach(obstacle=>{
                // remove from the HTML
            obstacle.element.remove();
            })
            
        });

        // variable becomes true
        this.gameIsOver = true;

        // gameScreen and container are no longer displayed
        this.gameScreen.style.display ='none';
        this.gameContainer.style.display ='none';

        // show end game screen
        this.endScreen.style.display = 'block';
    }

    // method for victory screen
    victoryGame(){

        // Remove player
        this.player.element.remove();

        // Remove all obstacles from the array of obstacles
        this.obstaclesArray.forEach(array=>{

            array.forEach(obstacle=>{
                // remove from the HTML
            obstacle.element.remove();
            })
            
        });

        // variable becomes true
        this.gameIsOver = true;

        // gameScreen and container are no longer displayed
        this.gameScreen.style.display ='none';
        this.gameContainer.style.display ='none';


        // show victory game screen
        this.victoryScreen.style.display = 'block';
    }

}
