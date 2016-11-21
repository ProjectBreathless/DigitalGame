gameObj.MainMenu = function(game) {};

gameObj.MainMenu.prototype = {
	create: function() {
		console.log('MainMenu');
    
    //Add title image
    var myBackground = this.add.sprite(0, 0, 'mainBG');
    myBackground.anchor.setTo(0, 0);
    logo = this.add.sprite(this.world.centerX, 40, 'titleLogo');
    logo.anchor.setTo(0.5, 0);
        
    music = this.add.audio('musicMainMenu');
    music.play();
        
    playBtn = this.add.button(this.world.centerX, this.world.centerY-5, 'playBtn', this.startGame, this, 1, 0, 2);
    playBtn.anchor.setTo(0.5, 0.5);
        
    titleShip = this.add.sprite( 100, 250, 'titleShip');
    titleShip.animations.add('shipMovement', [0, 1, 2, 3, 4, 5, 6, 7], 3, true);
    titleShip.animations.play('shipMovement');
        
    titleText = this.add.sprite( 100, 350, 'titleText');
    titleText.animations.add('textMovement', [0, 1, 2, 3, 4], 3, false);
    titleText.animations.play('textMovement');
        
	},
    
    

	startGame: function() {
        music.stop();
		this.game.state.start('Game');
	},
    
    instructOne: function() {
		this.game.state.start('MainMenu2');
	}
};