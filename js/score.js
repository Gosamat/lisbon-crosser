class Pastel {
    constructor(gameScreen, height, width, top, left, imgSrc){
        
        this.gameScreen = gameScreen;
        this.top = top;
        this.left = left;
        
        // Define size of obstacle
        this.width = width;
        this.height = height;

        // Define obstacle speed on the Y axis

        // create the HTML element and default styling
        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.setAttribute("id", "pastel");
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.top = `${top}px`;
        this.element.style.left = `${left}px`;
        

        //append obstacles to the Game Screen
        this.gameScreen.appendChild(this.element);
    }
}