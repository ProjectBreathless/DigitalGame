var gameObj = {
	// Global variables are decleared here!
	finalScore: "0",
	finalTime: "00:00"
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
	}
};