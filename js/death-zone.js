
class DeathZone {

    constructor(gameScreen) {

        this.gameScreen = gameScreen;

        // Parameters for location of zone
        this.top = 50;
        this.width = 650;
        this.height = 250;

        // create the HTML elements and default styling of the zone
        this.element = document.createElement("img");
        this.element.style.backgroundImage = "url(./images/water-surface.png)"
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.backgroundColor = 'blue';
    
        //append the zone to the Game Screen
        this.gameScreen.appendChild(this.element);
    
    }
}