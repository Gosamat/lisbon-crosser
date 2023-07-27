//  class for the zone where the player will acquire a prize upon reaching
// Takes place at the highest layer of the gamescreen with a "height" of 50.
class GetPrizeZone {

    constructor(gameScreen) {

        this.gameScreen = gameScreen;

        // Parameters for location of zone
        this.top = 0;
        this.width = 650;
        this.height = 50;

        // create the HTML elements and default styling of the zone
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.top}px`;
    
        //append the zone to the Game Screen
        this.gameScreen.appendChild(this.element);
    
    }
}