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
        this.victoryScreen = document.getElementById('victory-screen');
        this.gameContainer = document.getElementById ('game-container');

        // Creating Prize/victory zone property
        this.getPrize = new GetPrizeZone (this.gameScreen);

        // Variable for frame count
        this.frameCount = 0;
        
        // Creating Deposit zone property
        this.depositPrize = new DepositPrizeZone (this.gameScreen);

        // Creating deathzone for second part of the level
        this.deathZone = new DeathZone (this.gameScreen);

        // Player's life system
        this.lives = 3;

        // Controls of the gamespeed
        this.gamespeed = 1;

        // Player's score system
        this.score = 0;

        // Game State Boolean
        this.gameIsOver = false;

        // Tracker if player is in the upper level(aka deathZone)
        this.inDeathZone = false;


        // Creating the obstacles properties/arrays

        this.obstaclesArray = [[], [], [], [], [], [], [], [], [], [], []];

        //define the height and width we want to apply to the gameScreen once game is running 
        this.height = 650;
        this.width = 650;
        
        // gameScreen will by default have 0x 
        // When variable game is assigned to Game class and initialized, the gameScreen will have the height and width defined above.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

         // game over flag
         this.gameIsOver = false;

        //  Check to see if Player got prize from prize area
         this.prizeInHand = false;
         
        // Creating the player property
        this.player = new Player(this.gameScreen, 300, 600, 50, 50,"./images/test.png");

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
        // check if the game is over to interrupt the game loop
        if(this.gameIsOver){
            return;
        } 

        this.update();

        window.requestAnimationFrame(()=>this.gameLoop());
        this.frameCount ++;
    }

    updateGroupObjectsGround(arr, order){
        // Check for collision and if an obstacle is still on the screen
        for (let j = 0; j < arr.length; j++){

            // Grabbing an obstacle and moving it downwards
            const obstacle = arr[j];
            obstacle.move();

            // Check if the player collided with an obstacle
            if (this.player.didCollide(obstacle)){
                // What happens when player hits obstacle
                this.player.left = 300;
                this.player.top = 600;

                // Reduce player's life by 1
                this.lives--;
                this.prizeInHand = false;

            }

            // Check if the obstacle is off the screen ( at the bottom)
            else if(obstacle.left < -100 || obstacle.left+obstacle.width > 750){
                // Remove the obstacle from the HTML
                obstacle.element.remove();

                // Remove the object from the array of obstacles
                this.obstaclesArray[order].splice(j,1);

            }
        }

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
                this.obstaclesArray[4].push(new Obstacle(this.gameScreen, 3.5 * this.gamespeed, 50, 100, 350, 650, "left", "./images/truck.png"));
            }
        }
    }

    updateGroupObjectsWater(zone,arr, order){
        // Check for collision and if an obstacle is still on the screen
        
        for (let j = 0; j < arr.length; j++){

            // Grabbing an obstacle and moving it downwards
            const obstacle = arr[j];
            const obstacle1 = arr[0];
            const obstacle2 = arr[1];
            const obstacle3 = arr[2];
            obstacle.move();

            // Check if the obstacle is off the screen ( at the bottom)
            if(obstacle.left < -200 || obstacle.left+obstacle.width > 850){
                // Remove the obstacle from the HTML
                obstacle.element.remove();

                // Remove the object from the array of obstacles
                this.obstaclesArray[order].splice(j,1);
            }


            if(this.player.didCollide(zone) && !this.player.didCollide(obstacle)){
                console.log("touched zone")

                if (this.player.didCollide(obstacle)) {
                    console.log("Riding");
                    // this.player.didCollide(zone) && 
                    if (obstacle.moveDirection === "left") {
                        this.player.left -= obstacle.speed;
                        return;
                    } 
                    else if (obstacle.moveDirection === "right") {
                        this.player.left += obstacle.speed;
                        return;
                    }
                }

                else if (!this.player.didCollide(obstacle)) {

                    console.log("no touching");
                    // What happens when player hits obstacle
                    this.player.left = 300;
                    this.player.top = 600;
                    // Reduce player's life by 1
                    this.lives --;
                    this.prizeInHand = false;
                    return;
                }
                     
            }




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

            
    }

        if(order == 5){
            if (this.frameCount % 200 / (this.gamespeed*20) === 0 && this.obstaclesArray[5].length < 3){ 
                this.obstaclesArray[5].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 51, 150, 250, 651, "left"));
            }
        }

        if(order == 6){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[6].length < 3){ 
                this.obstaclesArray[6].push(new Obstacle(this.gameScreen, 1.5 * this.gamespeed, 51, 100, 200, -100, "right"));
            }
        }

        if(order == 7){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[7].length < 3){ 
                this.obstaclesArray[7].push(new Obstacle(this.gameScreen, 2.5 * this.gamespeed, 51, 200, 150, 650, "left"));
            }
        }

        if(order == 8){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[8].length < 3){ 
                this.obstaclesArray[8].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 51, 100, 100, -100, "right"));
            }
        }
        if(order == 9){
            if (this.frameCount % 150 / (this.gamespeed*20)  === 0 && this.obstaclesArray[9].length < 3){ 
                this.obstaclesArray[9].push(new Obstacle(this.gameScreen, 3.5 * this.gamespeed, 51, 150, 50, 650, "left"));
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


    update (){


        // check if player is inside of deathzone and update the appropriate boolean state
        if (this.player.didCollide(this.deathZone) && this.inDeathZone === false){
            this.inDeathZone = true;

        }

        // Bonus: scores and lives
        let score = document.getElementById('score');
        let lives = document.getElementById('lives');

        score.innerHTML = this.score;
        lives.innerHTML = this.lives;
    
        if(this.lives <= 0){
            this.endGame();
        }


        if(this.score === 1){
            this.victoryGame();
        }

        this.player.stayInPlay();
        // console.log("updating"); // just for tests


        // console.log(this.prizeInHand); // just for tests

        // Check if player got the prize
        if (this.player.gotPrize(this.getPrize)){

            // When player reaches prize area, the property turns true.
            this.prizeInHand = true;
           
        }
        
        this.updateGroupObjectsGround(this.obstaclesArray[0], 0)
        this.updateGroupObjectsGround(this.obstaclesArray[1], 1)
        this.updateGroupObjectsGround(this.obstaclesArray[2], 2)
        this.updateGroupObjectsGround(this.obstaclesArray[3], 3)
        this.updateGroupObjectsGround(this.obstaclesArray[4], 4)

        this.updateGroupObjectsWater(this.deathZone, this.obstaclesArray[5], 5)
        // this.updateGroupObjectsWater(this.deathZone, this.obstaclesArray[6], 6)
        // this.updateGroupObjectsWater(this.deathZone, this.obstaclesArray[7], 7)
        // this.updateGroupObjectsWater(this.deathZone, this.obstaclesArray[8], 8)
        // this.updateGroupObjectsWater(this.deathZone, this.obstaclesArray[9], 9)

        // // Check if player deposited the prize
        if (this.prizeInHand === true && this.player.touchDepositArea(this.depositPrize) === true){

            // When player reaches the deposit area, remove prize in hand aka becomes false and add to total score.
            this.prizeInHand = false;
            this.score ++;
            this.gamespeed += 0.2;
            console.log (this.gamespeed);
            // console.log(`current score is ${this.score}`);

            // console.log("Deposited Prize"); // just for tests

        }
        // Provide a visual white background color for when player has the prize in hand and can deposit
        if(this.prizeInHand === true){           
            this.player.element.style.backgroundColor = "white";
        } 

        else {
        this.player.element.style.backgroundColor = "";
         }
    }


    endGame(){
        // Remove player
        this.player.element.remove();

        // Remove all obstacles from the array of obstacles
        this.obstaclesArray.forEach(array=>{

            array.forEach(obstacle=>{
                // remove from the HTML
            obstacle.element.remove();
            })
            
        });

        this.gameIsOver = true;

        // Remvoe the game screen
        this.gameScreen.style.display ='none';

        this.gameContainer.style.display ='none';


        // show end game screen
        this.endScreen.style.display = 'block';
    }

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

        this.gameIsOver = true;

        // Remvoe the game screen
        this.gameScreen.style.display ='none';

        this.gameContainer.style.display ='none';


        // show end game screen
        this.victoryScreen.style.display = 'block';
    }

}
