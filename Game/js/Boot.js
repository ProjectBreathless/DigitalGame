var gameObj = {
	// Global variables are decleared here!
};

gameObj.Boot = function(game) {};

gameObj.Boot.prototype = {
	preload: function() {
		console.log("State - Boot");
		this.load.image('preloaderBg', 'imgs/loading-bg.png');
		this.load.image('preloaderBar', 'imgs/loading-bar.png');
	},
	create: function() {
		this.game.state.start('Preloader');
        var score;
	}
};