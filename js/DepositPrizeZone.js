// Class for the invisible zone where the player will need to deposit the prize.
// This zone is also the starting zone where the player is at the start of the game.
class DepositPrizeZone {

    constructor(gameScreen) {

        this.gameScreen = gameScreen;

        // parameters to ensure the zone is at the bottom of the gamescreen and only occupies "one move's" worth of height.
        this.top = 600;
        this.width = 650;
        this.height = 50;

        //The HTML element and default styling of the zone 
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.top}px`;
    
        //append zone to the Game Screen
        this.gameScreen.appendChild(this.element);
    
    }
}