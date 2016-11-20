gameObj.MainMenu = function(game) {};

gameObj.MainMenu.prototype = {
	create: function() {
		console.log('MainMenu');
    
    //Add title image
    var myBackground = this.add.sprite(0, 0, 'mainBG');
    myBackground.anchor.setTo(0, 0);
    playBtn = this.add.button(this.world.centerX, this.world.centerY-5, 'playBtn', this.startGame, this, 1, 0, 2);
    playBtn.anchor.setTo(0.5, 0.5);
        
    player = this.add.sprite(100, 300, 'Aria', 7);
    player.animations.add('left', [5, 4, 3, 2, 1, 0], 12, true); 
    //player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [8, 9, 10, 11, 12, 13], 12, true);
        
	},
    
    

	startGame: function() {
		this.game.state.start('Game');
	},
    
    instructOne: function() {
		this.game.state.start('MainMenu2');
	}
};