gameObj.Loser = function(game) {};

var musicLose;

gameObj.Loser.prototype = {
	create: function() {
		console.log("State - Loser");
		//Add background image
		this.stage.backgroundColor = '#111';
        
        var failSprite = this.add.sprite(300, 50, 'failSprite');
        failSprite.anchor.setTo(0, 0);
        
        failSprite.alpha = 0;
        var tween = this.add.tween(failSprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 8000, true);
        tween.yoyo(true, 1000);
        
        //Add button
		// The numbers given in parameters are the indexes of the frames, in this order: over, out, down 
        var replayBtn = this.add.button(200, 480, 'replayBtn', this.startGame, this, 1, 0, 2);
        replayBtn.anchor.setTo(0.5, 0.5);
		
		var menuBtn = this.add.button(1000, 480, 'menuBtn', this.mainScreen, this, 1, 0, 2);
		menuBtn.anchor.setTo(0.5, 0.5);
		
		musicLose = this.add.audio('musicLoseScreen');
		musicLose.play();
		
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