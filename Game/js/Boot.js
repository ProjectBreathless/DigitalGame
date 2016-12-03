var gameObj = {
	// Global variables are decleared here!
    score: 0,
    timeLeft: 0
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
        this.game.score = 0;
        this.game.timeLeft = 5;
	}
};