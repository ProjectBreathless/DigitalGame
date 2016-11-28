gameObj.Loser = function(game) {};

gameObj.Loser.prototype = {
	create: function() {
		console.log("State - Loser");
		//Add background image
		var myBackground = this.add.sprite(0, 0, 'mainBG');
        myBackground.anchor.setTo(0, 0);
        logo = this.add.sprite(40, 40, 'titleLogo');
        logo.anchor.setTo(0, 0);
        
        
        //Add button
		// The numbers given in parameters are the indexes of the frames, in this order: over, out, down 
        replayBtn = this.add.button(400, this.world.centerY+20, 'replayBtn', this.startGame, this, 1, 0, 2);
        replayBtn.anchor.setTo(0.5, 0.5);
		
		var close = this.add.button(this.world.centerX - 110, this.world.centerY + 200, 'closeBtn', this.mainScreen, this, 1, 0, 2);
		close.anchor.setTo(1, 0.5);

		//Add text
		var scoreText = score;
        var timeText = 0;

		var myStyle = { width: "150px", font: "100px VT323", fill: "black", align: "left"};

		var myScore = this.add.text(50,200, "Score: " + scoreText, myStyle );
        //var myTime = this.add.text(50,290, timeText, myStyle );
		           
		
	},
	startGame: function() {
		this.game.state.start('Game');
	},
    mainScreen: function() {
		this.game.state.start('MainMenu');
	}
};