class DepositPrize {

    constructor(gameScreen) {

        this.gameScreen = gameScreen;

        // appear at the toppest layer
        this.top = 600;
        this.width = 650;
        this.height = 50;

        // create the HTML element and default styling
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.backgroundColor = 'yellow';
    
        //append obstacles to the Game Screen
        this.gameScreen.appendChild(this.element);
    
    }
}