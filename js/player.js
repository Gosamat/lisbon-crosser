class Player {
    
    constructor( gameScreen, left, top, width, height, /*imgSrc(To add)*/ ){
        
        this.gameScreen = gameScreen;   

        // horizontal position of the player (via position absolute)
        this.left = left;
        // vertical position of the player (via position absolute)
        this.top = top;
        // width of the player
        this.width = width;
        //  height of the player
        this.height = height;
        // create the img tag fro the player, define src and default
        this.element = document.createElement('div');
        /* this.element.src = imgSrc; */
        this.element.style.backgroundColor = 'blue';
        this.element.style.position = 'absolute';
        //  set up default element's properties
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.top = `${top}px`;
        this.element.style.left = `${left}px`;

        //append Player to the Game Screen
        this.gameScreen.appendChild(this.element);
    }

    move(){
        // Update player's car position based on directionX and directionY
        
        this.left +=this.directionX;
        this.top +=this.directionY;

        this.updatePosition();

    }

    // Updates the Position of the car in the CSS
    updatePosition(){
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
}

