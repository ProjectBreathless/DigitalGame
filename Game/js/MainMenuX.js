gameObj.MainMenuX = function(game) {};

gameObj.MainMenuX.prototype = {
	create: function() {
		console.log('MainMenuX');
    
    //Add title image
    var myBackground = this.add.sprite(this.world.centerX, this.world.centerY-250, 'logo');
    myBackground.anchor.setTo(0.5, 0.5);

    //Add button
    // The numbers given in parameters are the indexes of the frames, in this order: over, out, down
    playBtn = this.add.button(this.world.centerX + 80, this.world.centerY-95, 'playBtn', this.startGame, this, 1, 0, 2);
    playBtn.anchor.setTo(0.5, 0.5);
        
    infoBtn = this.add.button(this.world.centerX - 80, this.world.centerY-95, 'infoBtn', this.instruct4, this, 10, 9, 11);
    infoBtn.anchor.setTo(0.5, 0.5);    
    
    var snake = this.add.sprite(this.world.centerX, this.world.height - 280, 'snake'); // Where img displays on screen
            snake.anchor.setTo(0.5, 0.5); // Centers the origin
            
            var myText = "Sacre off snakes with \n  your flame."; // Backslash 'n' makes a new line
            var myStyle = { font: "400 40px Freckle Face", fill: "#fff", align: "center"};
            var myCaption = this.add.text(this.world.centerX - 200, this.world.height - 180, myText, myStyle); // (x, y, string, style)
	},
    
    

	startGame: function() {
		this.game.state.start('Game');
	},
    
    instruct4: function() {
		this.game.state.start('MainMenu');
	}
};