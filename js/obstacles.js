class Obstacle {
    constructor(gameScreen, speed, height, width, top, startPosition, moveDirection /* imgSrc */){
        
        this.gameScreen = gameScreen;
        this.speed = speed;
        this.top = top;
        this.startPosition = startPosition;
        this.moveDirection = moveDirection; //moveDirection will only be either "left" or "right"
        
        // Define size of obstacle
        this.width = width;
        this.height = height;
        this.left = this.startPosition;

        // Define obstacle speed on the Y axis

        // create the HTML element and default styling
        this.element = document.createElement("div");
        this.element.style.backgroundColor = 'pink';
        // this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.top = `${top}px`;
        this.element.style.left = `${this.left}px`;
        

        //append obstacles to the Game Screen
        this.gameScreen.appendChild(this.element);
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${top}px`;
    }

    move(){

        //drop the obstacles 3px to the bottom
        if( this.moveDirection === "left"){
        this.left -= this.speed;
        this.updatePosition();
        }
        else{
            this.left += this.speed;
        this.updatePosition();
        }
    }


}


// temos 1 clas de object
// criar um object com a class definido o tamanho, start position, a starting speed, a direction. DONE
// dar spawn a varios objects com as mesmas properties mas com uma set gap entre eles
// aplicar o spawn a outros objects com gap diferente e direction e top diferente

// possibilities
//  - definir uma function que leva um dos objects como parametro, declarando ja nele as cenas de tamanho,start, speed, etc.