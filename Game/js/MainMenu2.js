gameObj.MainMenu2 = function(game) {};

gameObj.MainMenu2.prototype = {
	create: function() {
		console.log('MainMenu2');
    
    //Add title image
    var myBackground = this.add.sprite(this.world.centerX, this.world.centerY-250, 'logo');
    myBackground.anchor.setTo(0.5, 0.5);

    //Add button
    // The numbers given in parameters are the indexes of the frames, in this order: over, out, down
    playBtn = this.add.button(this.world.centerX + 80, this.world.centerY-95, 'playBtn', this.startGame, this, 1, 0, 2);
    playBtn.anchor.setTo(0.5, 0.5);
        
    infoBtn = this.add.button(this.world.centerX - 80, this.world.centerY-95, 'infoBtn', this.instruct2, this, 4, 3, 5);
    infoBtn.anchor.setTo(0.5, 0.5);   
        
    var mouse = this.add.sprite(this.world.centerX, this.world.height - 280, 'mouse'); // Where img displays on screen
            mouse.anchor.setTo(0.5, 0.5); // Centers the origin
            
    var myText = "Use your mouse to \n  control the torch."; // Backslash 'n' makes a new line
    var myStyle = { font: "400 40px Freckle Face", fill: "#fff", align: "center"};
            //var myStyle = { font: "25px Arial", fill: "#fff", align: "center"};
    var myCaption = this.add.text(this.world.centerX - 170, this.world.height - 180, myText, myStyle); // (x, y, string, style)
        
	},
    
    

	startGame: function() {
		this.game.state.start('Game');
	},
    
    instruct2: function() {
		this.game.state.start('MainMenu3');
	}
};