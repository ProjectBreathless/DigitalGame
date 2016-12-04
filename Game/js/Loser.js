gameObj.Loser = function(game) {};

var musicLose;

gameObj.Loser.prototype = {
	create: function() {
		console.log("State - Loser");
		//Add background image
		this.stage.backgroundColor = '#111';
        
//        // Create the timer
//        timer = this.game.time.create();
//
//        min = 0;
//        sec = 10;
//
//        // Set the length of the timer
//        timerEvent = timer.add(Phaser.Timer.MINUTE * min + Phaser.Timer.SECOND * sec, this.endTimer, this);
//
//        // Start the timer
//        timer.start();
        
        //Added so world size is correct
        this.game.world.height = 960;
        this.game.world.width = 2600;
        //-------------------------------------------
        
        var failSprite = this.add.sprite(300, 50, 'failSprite');
        failSprite.anchor.setTo(0, 0);
        
        failSprite.alpha = 0;
        var tween = this.add.tween(failSprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 8000, true);
        tween.yoyo(true, 1000);
        
        this.game.score = 0;
        
        //Add button
		// The numbers given in parameters are the indexes of the frames, in this order: over, out, down 
        var replayBtn = this.add.button(200, this.world.centerY, 'replayBtn', this.startGame, this, 1, 0, 2);
        replayBtn.anchor.setTo(0.5, 0.5);
		
		var menuBtn = this.add.button(1000, this.world.centerY, 'menuBtn', this.mainScreen, this, 1, 0, 2);
		menuBtn.anchor.setTo(0.5, 0.5);
		
		musicLose = this.add.audio('musicLoseScreen');
		musicLose.play();

//		//Add text
//		var scoreText = score;
//        var timeText = 0;
//
//		var myStyle = { width: "150px", font: "100px VT323", fill: "black", align: "left"};
//
//		var myScore = this.add.text(50,200, "Score: " + scoreText, myStyle );
//        //var myTime = this.add.text(50,290, timeText, myStyle );
		           
		
	},
	startGame: function() {
		musicLose.stop();
		this.game.state.start('L1');
	},
    mainScreen: function() {
    	musicLose.stop();
		this.game.state.start('MainMenu');
	}
};