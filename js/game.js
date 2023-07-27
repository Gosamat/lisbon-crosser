class Game {
    constructor(){

        // Variables to later refer to the different possible screens of the webpage
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.endScreen = document.getElementById('end-screen');
        this.victoryScreen = document.getElementById('victory-screen');
        this.gameContainer = document.getElementById ('game-container');

        // Creating the zone property where the player acquires the prize
        this.getPrize = new GetPrizeZone (this.gameScreen);

        // Variable for frame count
        this.frameCount = 0;
        
        // Creating prize deposit zone property
        this.depositPrize = new DepositPrizeZone (this.gameScreen);

        //might be deprecated, UNSURE
        // // Creating deathzone for second part of the level
        // this.deathZone = new DeathZone (this.gameScreen);

        // Player's life system
        this.lives = 3;

        // Controls of the gamespeed
        this.gamespeed = 1;

        // Player's score system
        this.score = 0;

        // Game State Boolean
        this.gameIsOver = false;

         // game over flag
         this.gameIsOver = false;

        //  Check to see if Player got prize from prize area
         this.prizeInHand = false;
         
        // Creating the player property
        this.player = new Player(this.gameScreen, 300, 600, 50, 50,"./images/test.png");

        //might be deprecated, UNSURE
        // Tracker if player is on top of an obstacle)
        // this.playerInObstacle = false;


        // Create the obstacles array of arrays
        this.obstaclesArray = [[], [], [], [], [], [], [], [], [], [], []];

        //define the height and width we want to apply to the gameScreen once game is running 
        this.height = 660;
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
                this.obstaclesArray[0].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 50, 550, 700, "left", "./images/Car1-test1.png"));
            }
        }
        else if(order == 1){
            if (this.frameCount % 130 / (this.gamespeed*100)  === 0 && this.obstaclesArray[1].length < 3){ 
                this.obstaclesArray[1].push(new Obstacle(this.gameScreen, 1.5 * this.gamespeed, 50, 50, 500, -100, "right", "./images/Car1-test1.png"));
            }
        }

        else if(order == 2){
            if (this.frameCount % 130 / (this.gamespeed*100)  === 0 && this.obstaclesArray[2].length < 3){ 
                this.obstaclesArray[2].push(new Obstacle(this.gameScreen, 2.5 * this.gamespeed, 50, 50, 450, 700, "left", "./images/Car1-test2.png"));
            }
        }

        else if(order == 3){
            if (this.frameCount % 200 / (this.gamespeed*100)  === 0 && this.obstaclesArray[3].length < 3){ 
                this.obstaclesArray[3].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 50, 400, -100, "right", "./images/Car1-test2.png"));
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
      
        // UNCOMMENT IF TESTS DO NOT WORK
        // if (arr.some(obstacle => this.player.didCollide(obstacle))) {
        //   // What happens when player hits obstacle
        //   if(!this.playerInObstacle){
        //     this.playerInObstacle = true;
        //   }
        //   const collidedObstacle = arr.find(obstacle => this.player.didCollide(obstacle));
        //   if (collidedObstacle.moveDirection === "left") {
        //     this.player.left -= collidedObstacle.speed;
        //   } else if (collidedObstacle.moveDirection =32== "right") {
        //     this.player.left += collidedObstacle.speed;
        //   }
        // } 
        // console.log(this.playerInObstacle)
            // console.log(`obstacle 2: ${this.player.didCollide(obstacle2)}`);
            // console.log(`obstacle 3: ${this.player.didCollide(obstacle3)}`);



                // if (this.playerInObstacle === true) {
                //     console.log("collided with obstacle");
                //     // this.player.didCollide(zone) && 
                //     if (obstacle.moveDirection === "left") {
                //         this.player.left -= obstacle.speed;
                //         return;
                //     } 
                //     else if (obstacle.moveDirection === "right") {
                //         this.player.left += obstacle.speed;
                //         return;
                //     }
                // }
            
        
            // if (this.player.left >= obstacle1.left
            //     && this.player.left <= (obstacle1.left + obstacle1.width)
            //     && this.player.top  >= obstacle1.top 
            //     && this.player.top <= (obstacle1.top + obstacle1.height)
            //     && this.player.top > 50 
            //     && this.player.top < 300) {
            //         if (obstacle.moveDirection === "left") {
            //             this.player.left -= obstacle.speed;
            //             return;
            //         } 
    
            //         else if (obstacle.moveDirection === "right") {
            //             this.player.left += obstacle.speed;
            //             return;
            //         }

            //     }

            //     else if (this.player.left >= obstacle2.left
            //     && this.player.left <= (obstacle2.left + obstacle2.width)
            //     && this.player.top  >= obstacle2.top 
            //     && this.player.top <= (obstacle2.top + obstacle2.height)
            //     && this.player.top > 50 
            //     && this.player.top < 300) {
            //         if (obstacle.moveDirection === "left") {
            //             this.player.left -= obstacle.speed;
            //             return;
            //         } 
    
            //         else if (obstacle.moveDirection === "right") {
            //             this.player.left += obstacle.speed;
            //             return;
            //         }

            //     }

            //     else if (this.player.left >= obstacle3.left
            //     && this.player.left <= (obstacle3.left + obstacle3.width)
            //     && this.player.top  >= obstacle3.top 
            //     && this.player.top <= (obstacle3.top + obstacle3.height)
            //     && this.player.top > 50 
            //     && this.player.top < 300){

            //     if (obstacle.moveDirection === "left") {
            //         this.player.left -= obstacle.speed;
            //         return;
            //     } 

            //     else if (obstacle.moveDirection === "right") {
            //         this.player.left += obstacle.speed;
            //         return;
            //     }
                
            // }

            // else if (this.player.top > 50 
            //     && this.player.top < 300) {

            //     console.log("not touching obstacle");
            //     // What happens when player hits obstacle
            //     this.player.left = 300;
            //     this.player.top = 600;
            //     // Reduce player's life by 1
            //     this.lives --;
            //     this.prizeInHand = false;
            //     return;
            // }
                // console.log("Riding");
                // this.player.didCollide(zone) && 
            //     if (obstacle.moveDirection === "left") {
            //         this.player.left -= obstacle.speed;
            //         return;
            //     } 
            //     else if (obstacle.moveDirection === "right") {
            //         this.player.left += obstacle.speed;
            //         return;
            //     }

            // } else if(this.player.didCollide(zone) && this.player.didCollide(obstacle)){

            //     console.log("no touching");
            //     // What happens when player hits obstacle
            //     this.player.left = 300;
            //     this.player.top = 600;
            //     // Reduce player's life by 1
            //     this.lives --;
            //     this.prizeInHand = false;
            //     return;
            // }

         // with the method parameter "order", we specify which object we want to push at a given time and which array inside the main array do we want to push it to.
        // we can control in with frame interval each obstacle spawns in their respective row and the max amount of objects per row
        if(order == 5){
            if (this.frameCount % 200 / (this.gamespeed*20) === 0 && this.obstaclesArray[5].length < 3){ 
                this.obstaclesArray[5].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 150, 250, 650, "left", "./images/truck2.png"));
            }
        }

        if(order == 6){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[6].length < 3){ 
                this.obstaclesArray[6].push(new Obstacle(this.gameScreen, 1.5 * this.gamespeed, 50, 100, 200, -100, "right", "./images/truck2.png"));
            }
        }

        if(order == 7){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[7].length < 3){ 
                this.obstaclesArray[7].push(new Obstacle(this.gameScreen, 2.5 * this.gamespeed, 50, 200, 150, 650, "left", "./images/truck2.png"));
            }
        }

        if(order == 8){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[8].length < 3){ 
                this.obstaclesArray[8].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 100, 100, -100, "right", "./images/truck2.png"));
            }
        }
        if(order == 9){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[9].length < 3){ 
                this.obstaclesArray[9].push(new Obstacle(this.gameScreen, 3.5 * this.gamespeed, 50, 150, 50, 650, "left",  "./images/truck2.png"));
            }
        }
    }

    // updateGroupObjectsWater(zone,arr){
    //     // Check for collision and if an obstacle is still on the screen
        
    //     for (let i = 0; i < arr.length; i++){

    //         // Grabbing an obstacle and moving it downwards
    //         const obstacle = arr[i];
    //         const obstacle1 = arr[0];
    //         const obstacle2 = arr[1];
    //         const obstacle3 = arr[2];
    //         obstacle.move();

    //         // Check if the obstacle is off the screen ( at the bottom)
    //         if(obstacle.left < -200 || obstacle.left+obstacle.width > 850){
    //             // Remove the obstacle from the HTML
    //             obstacle.element.remove();

    //             // Remove the object from the array of obstacles
    //             arr.splice(i,1);
    //         }


    //         if (this.player.didCollide(obstacle)) {
    //                 console.log("Riding");
    //                 // this.player.didCollide(zone) && 
    //                 if (obstacle.moveDirection === "left") {
    //                     this.player.left -= obstacle.speed;
    //                     return;
    //                 } 
    //                 else if (obstacle.moveDirection === "right") {
    //                     this.player.left += obstacle.speed;
    //                     return;
    //                 }
    //             }
    // }
    //     if (this.player.didCollide(zone)) {

    //     console.log("no touching");
    //     // What happens when player hits obstacle
    //     this.player.left = 300;
    //     this.player.top = 600;
    //     // Reduce player's life by 1
    //     this.lives --;
    //     this.prizeInHand = false;
    //     return;
    // }

    //     if(this.frameCount % 200 / (this.gamespeed*20) === 0 && arr.length < 15){ 
    //         arr.push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 51, 150, 250, 651, "left"));
    //     }

    //     if(this.frameCount % 150 / (this.gamespeed*20)&& arr.length < 15){ 
    //         arr.push(new Obstacle(this.gameScreen, 1.5 * this.gamespeed, 51, 100, 200, -100, "right"));
    //     }

    //     if(this.frameCount % 150 / (this.gamespeed*20)&& arr.length < 15 ){
    //         arr.push(new Obstacle(this.gameScreen, 2.5 * this.gamespeed, 51, 200, 150, 650, "left"));
    //     }

    //     if(this.frameCount % 150 / (this.gamespeed*20)&& arr.length < 15 ){
    //         arr.push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 51, 100, 100, -100, "right"));
    //     }
    //     if(this.frameCount % 150 / (this.gamespeed*20)&& arr.length < 15){
    //         arr.push(new Obstacle(this.gameScreen, 3.5 * this.gamespeed, 51, 150, 50, 650, "left"));
    //     }
    // }
 /*    deathZoneUpdate (zone, arr){

        // Check for collision and if an obstacle is still on the screen
        for (let j = 0; j < arr.length; j++){

            // Grabbing an obstacle and moving it downwards
            const obstacle = arr[j];
            
         if (this.player.didCollide(zone) && this.player.didCollide(obstacle[0])){
            // this.player.move() = obstacle[0].move();
            this.player.element.style.left = `${this.obstacle[0].element.style.left}px`;
            this.player.element.style.top = `${this.obstacle[0].element.style.top}px`;
        
         }

         else if (this.player.didCollide(zone) && this.player.didCollide(obstacle[1])){
            // this.player.move() = obstacle[1].move();
            this.player.element.style.left = `${this.obstacle[1].element.style.left}px`;
            this.player.element.style.top = `${this.obstacle[1].element.style.top}px`;
        
         }

         else if (this.player.didCollide(zone) && this.player.didCollide(obstacle[2])){
            // this.player.move() = obstacle[2].move();
            this.player.element.style.left = `${this.obstacle[2].element.style.left}px`;
            this.player.element.style.top = `${this.obstacle[2].element.style.top}px`;
        
         }
         else if (this.player.didCollide(zone)) {
            // What happens when player hits obstacle
            this.player.left = 300;
            this.player.top = 600;
            // Reduce player's life by 1
            this.lives--;
         }
    }
    
} */

    // Method that runs each gameloop that ensures that the various systems of the game are updating as the loop goes
    // this applies to score, lives, winning condition, losing condition and collision checks for the water zone.
    update (){

        // Score and lives system
        let score = document.getElementById('score');
        let lives = document.getElementById('lives');

        score.innerHTML = this.score;
        lives.innerHTML = this.lives;
    
        // End/lose the game if lives are 0
        if(this.lives <= 0){
            this.endGame();
        }

        // End/win the game if the score has increased to 5
        if(this.score === 1){
            this.victoryGame();
        }

        // Player's method for ensuring it stays inside of the gameScreen's boundaries
        this.player.stayInPlay();

        // Check to see if player has collided with the prize zone
        if (this.player.gotPrize(this.getPrize)){

            // If player did collide, then he will have the prize in hand.
            this.prizeInHand = true;
           
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

        // Test 2 with this method
        // let collisionCheck = this.obstaclesArray[5].some(obstacle => this.player.didCollide(obstacle))   
        // || this.obstaclesArray[6].some(obstacle => this.player.didCollide(obstacle))
        // || this.obstaclesArray[7].some(obstacle => this.player.didCollide(obstacle))
        // || this.obstaclesArray[8].some(obstacle => this.player.didCollide(obstacle))
        // || this.obstaclesArray[9].some(obstacle => this.player.didCollide(obstacle));

        

        //  test result
        if(!collisionCheck 
        && this.player.top >= 50 && this.player.top < 300 ){
            this.player.left = 300;
            this.player.top = 600;
            // Reduce player's life by 1
            this.lives--;
            this.prizeInHand = false;
            collisionCheck = false;
        }

        // UNCOMMENT IF TESTS DO NOT WORK
        // if(this.playerInObstacle === false && this.player.top > 50 && this.player.top < 300){
        //     // What happens when player hits obstacle
        //     this.player.left = 300;
        //     this.player.top = 600;
        //     // Reduce player's life by 1
        //     this.lives--;
        // }

        // Check if player has prize in hand and has reached the deposit zone (aka starting zone)
        if (this.prizeInHand === true && this.player.touchDepositArea(this.depositPrize) === true){

            // When player reaches the deposit zone, remove prize in hand, add to total score and increase the overall speed of all obstacles.
            this.prizeInHand = false;
            this.score ++;
            this.gamespeed += 0.2;
            console.log (`Game speed has now been increased to${this.gamespeed}`);
        }

        // Provide a visual white background color for when player has the prize in hand and can deposit
        if(this.prizeInHand === true){           
            this.player.element.style.backgroundColor = "white";
        } 

        else {
        this.player.element.style.backgroundColor = "";
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
