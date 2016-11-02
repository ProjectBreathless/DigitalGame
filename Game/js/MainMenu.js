gameObj.MainMenu = function(game) {};

gameObj.MainMenu.prototype = {
	create: function() {
		console.log('MainMenu');
    
    //Add title image
    var myBackground = this.add.sprite(this.world.centerX, this.world.centerY-250, 'logo');
    myBackground.anchor.setTo(0.5, 0.5);

    //Add button
    // The numbers given in parameters are the indexes of the frames, in this order: over, out, down
    playBtn = this.add.button(this.world.centerX + 80, this.world.centerY-95, 'playBtn', this.startGame, this, 1, 0, 2);
    playBtn.anchor.setTo(0.5, 0.5);
        
    infoBtn = this.add.button(this.world.centerX - 80, this.world.centerY-95, 'infoBtn', this.instructOne, this, 1, 0, 2);
    infoBtn.anchor.setTo(0.5, 0.5);    
        
	},
    
    

	startGame: function() {
		this.game.state.start('Game');
	},
    
    instructOne: function() {
		this.game.state.start('MainMenu2');
	}
};