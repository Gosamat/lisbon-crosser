//  class for the zone where the player will gain the prize upon reaching
class GetPrizeZone {

    constructor(gameScreen) {

        this.gameScreen = gameScreen;

        // ensure that the zone for getting the prize appears at the top of the screen in the last layer reachable by the player
        this.top = 0;
        this.width = 650;
        this.height = 50;

        // create the HTML elements and default styling of the zone (later hidden)
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.backgroundColor = 'green';
    
        //append the zone to the Game Screen
        this.gameScreen.appendChild(this.element);
    
    }
}