gameObj.Winner = function(game) {};

var musicWin;

var distance = 300;
var speed = 6;
var star;
var texture;

var max = 400;
var xx = [];
var yy = [];
var zz = [];

var bgGroup;

gameObj.Winner.prototype = {
	create: function() {
        console.log("State - Winner");
        
        //Added so world size is correct
        this.game.world.height = 960;
        this.game.world.width = 2600;
        //-------------------------------------------
        
        bgGroup = this.game.add.group();
        
        //Add "Success" sprite
        var successSprite = this.add.sprite(60, 30, 'successSprite');
        successSprite.anchor.setTo(0, 0);
        
        //Add Buttons
        replayBtn = this.add.button(400, this.world.centerY+20, 'replayBtn', this.startGame, this, 1, 0, 2);
        replayBtn.anchor.setTo(0.5, 0.5);
        
        menuBtn = this.add.button(800, this.world.centerY+20, 'menuBtn', this.mainScreen, this, 1, 0, 2);
        menuBtn.anchor.setTo(0.5, 0.5);

        //Add Scores
        
		var scoreText = this.game.score;
        var timeText = this.game.timeLeft;
        
        var sText = this.add.text(850, 200, scoreText );
        var tText = this.add.text(850, 290, timeText + " Seconds" );
        
        sText.font = "VT323";
        sText.fontSize = 55;
        sText.stroke = "#ec2fe6";
        sText.strokeThickness = 4;
        sText.fill = "#a511a0";
        sText.align = "left";
        
        tText.font = "VT323";
        tText.fontSize = 55;
        tText.stroke = "#43caf7";
        tText.strokeThickness = 4;
        tText.fill = "#696969";
        tText.align = "left";

		var myScore = this.add.text(80, 200, "Crystals Found\t\t -  -  -  -  -");
        var myTime = this.add.text(80, 290, "Air Remaining\t\t\t -  -  -  -  -");
        
        myScore.font = "VT323";
        myScore.fontSize = 55;
        myScore.stroke = "#ec2fe6";
        myScore.strokeThickness = 4;
        myScore.fill = "#a511a0";
        myScore.align = "left";
                
        myTime.font = "VT323";
        myTime.fontSize = 55;
        myTime.stroke = "#43caf7";
        myTime.strokeThickness = 4;
        myTime.fill = "#696969";
        myTime.align = "left";
        
        //Star background
        star = this.make.sprite(0, 0, 'tinystar');
        texture = this.add.renderTexture(this.world._width, this.world._height, 'texture');

        this.add.sprite(0, 0, texture);

        for (var i = 0; i < max; i++)
        {
            xx[i] = Math.floor(Math.random() * this.world._width) - (this.world._width/2);
            yy[i] = Math.floor(Math.random() * this.world._height) - (this.world._height/2);
            zz[i] = Math.floor(Math.random() * 1700) - 100;
        }
        
        bgGroup.add(successSprite);
        bgGroup.add(replayBtn);
        bgGroup.add(menuBtn);
        bgGroup.add(sText);
        bgGroup.add(tText);
        bgGroup.add(myScore);
        bgGroup.add(myTime);
        
        musicWin = this.add.audio('musicWinScreen');
        musicWin.loopFull();
        
    },

    update: function() {
        
        this.game.world.bringToTop(bgGroup);

        texture.clear();

        for (var i = 0; i < max; i++)
        {
            var perspective = distance / (distance - zz[i]);
            var x = this.world.centerX + xx[i] * perspective;
            var y = this.world.centerY + yy[i] * perspective;

            zz[i] += speed;

            if (zz[i] > 300)
            {
                zz[i] -= 600;
            }

            texture.renderXY(star, x, y);
        }

    },
		
	startGame: function() {
		musicWin.stop();
		this.game.state.start('L1');
	},
    mainScreen: function() {
        musicWin.stop();
		this.game.state.start('MainMenu');
	}
};