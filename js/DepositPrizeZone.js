// Class for the zone where the player will need to deposit the prize
class DepositPrizeZone {

    constructor(gameScreen) {

        this.gameScreen = gameScreen;

        // For the zone to appear in the lowest layer a.k.a the layer where the player starts the game.
        this.top = 600;
        this.width = 650;
        this.height = 50;

        //The HTML element and default styling of the zone (later hidden)
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.top}px`;
    
        //append zone to the Game Screen
        this.gameScreen.appendChild(this.element);
    
    }
}