//  class for the zone where the player will gain the prize upon reaching
class DeathZone {

    constructor(gameScreen) {

        this.gameScreen = gameScreen;

        // ensure that the zone for getting the prize appears at the top of the screen in the last layer reachable by the player
        this.top = 50;
        this.width = 650;
        this.height = 250;

        // create the HTML elements and default styling of the zone (later hidden)
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.backgroundColor = 'blue';
    
        //append the zone to the Game Screen
        this.gameScreen.appendChild(this.element);
    
    }
}