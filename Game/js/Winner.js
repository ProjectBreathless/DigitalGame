gameObj.Winner = function(game) {};

gameObj.Winner.prototype = {
	create: function() {
		console.log("State - Winner");
		//Add background image
		var myLogo = this.add.sprite(this.world.centerX, this.world.centerY, 'winBg');
		myLogo.anchor.setTo(0.5, 0.5);

		//Add title image
		var myBackground = this.add.sprite(this.world.centerX, this.world.centerY-250, 'winImg');
		myBackground.anchor.setTo(0.5, 0.5);

		//Add list graphics
        
        var scoreDisp = this.add.sprite(this.world.centerX + 150, this.world.centerY - 0, 'scoreDisp'); // Where img displays on screen
        scoreDisp.anchor.setTo(0.5, 0.5); // Centers the origin
            
        var timeDisp = this.add.sprite(this.world.centerX - 150, this.world.centerY - 7, 'timeDisp'); // Where img displays on screen
        timeDisp.anchor.setTo(0.5, 0.5); // Centers the origin
        
        
        //Add button
		// The numbers given in parameters are the indexes of the frames, in this order: over, out, down 
        var replay = this.add.button(this.world.centerX - 90, this.world.centerY + 200, 'againBtn', this.startGame, this, 1, 0, 2);
		replay.anchor.setTo(0, 0.5);
		
		var close = this.add.button(this.world.centerX - 110, this.world.centerY + 200, 'closeBtn', this.mainScreen, this, 1, 0, 2);
		close.anchor.setTo(1, 0.5);

		//Add text
		var scoreText = score;
        var timeText = displayMin + ":" + displaySec;

		var myStyle = { width: "150px", font: "50px Freckle Face", fill: "black", align: "left"};

		var myScore = this.add.text(this.world.centerX+60,this.world.centerY-25, scoreText, myStyle );
        var myTime = this.add.text(this.world.centerX-160,this.world.centerY-25, timeText, myStyle );
		           
		
	},
	startGame: function() {
		this.game.state.start('Game');
	},
    mainScreen: function() {
		this.game.state.start('MainMenu');
	}
};