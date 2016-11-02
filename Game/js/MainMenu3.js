gameObj.MainMenu3 = function(game) {};

gameObj.MainMenu3.prototype = {
	create: function() {
		console.log('MainMenu3');
    
    //Add title image
    var myBackground = this.add.sprite(this.world.centerX, this.world.centerY-250, 'logo');
    myBackground.anchor.setTo(0.5, 0.5);

    //Add button
    // The numbers given in parameters are the indexes of the frames, in this order: over, out, down
    playBtn = this.add.button(this.world.centerX + 80, this.world.centerY-95, 'playBtn', this.startGame, this, 1, 0, 2);
    playBtn.anchor.setTo(0.5, 0.5);
        
    infoBtn = this.add.button(this.world.centerX - 80, this.world.centerY-95, 'infoBtn', this.instruct3, this, 7, 6, 8);
    infoBtn.anchor.setTo(0.5, 0.5);    
        
        
    var character = this.add.sprite(this.world.centerX, this.world.height - 280, 'character'); // Where img displays on screen
            character.anchor.setTo(0.5, 0.5); // Centers the origin
            
            var myText = "Guide your adventurer to \n  thruogh the maze"; // Backslash 'n' makes a new line
            var myStyle = { font: "400 40px Freckle Face", fill: "#fff", align: "center"};
            var myCaption = this.add.text(this.world.centerX - 220, this.world.height - 180, myText, myStyle); // (x, y, string, style)
	},
    
    

	startGame: function() {
		this.game.state.start('Game');
	},
    
    instruct3: function() {
		this.game.state.start('MainMenuX');
	}
};