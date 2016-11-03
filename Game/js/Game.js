gameObj.Game = function(game) {
    // Declare game variables
    var myTime;
    var gameSeconds; // Total game seconds
    var timerSeconds;
    var secondsLeft; // Total game seconds - Current timer seconds
    
    var myPoints;
    var currentScore;
    var totalCoin; // Coin counter
    
    var character;
    var cell;
    var cells;
    var snakes;
    var torch;
    
    var map;
    var layer;
};

gameObj.Game.prototype = {
    
	create: function() {
		console.log("State - Game");
		//Add background image
//		var myLogo = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
//		myLogo.anchor.setTo(0.5, 0.5);
    
		//Add list graphics
		var background = this.add.sprite(0, 0, 'bg');
        
        
        map = this.add.tilemap('mario');

        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

        layer = map.createLayer('World1');

        layer.resizeWorld();

        layer.wrap = true;

        cursors = this.input.keyboard.createCursorKeys();
        
        
        //  This resizes the game world to match the layer dimensions
        
        this.cell = this.add.tileSprite(-55, 0, 75, this.game.world.height,'wall');

        // This is a group
        cells = this.add.group();
        cells.enableBody = true;
        cells.physicsBodyType = Phaser.Physics.ARCADE;
    
    
        // Easy way to hold coordinates in a grid coordinates (x 100)
        var placex = [3, 4, 1, 2, 3, 3, 6, 7, 8, 8, 3, 4, 5, 1, 2, 3, 7, 5, 6, 7, 6, 7];
        var placey = [1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 7, 7, 8, 9, 9, 9, 10, 10];
        
        for (var i = 0; i < placex.length; i++) {
            cell = cells.create(placex[i] * 75, placey[i] * 75, 'wall');
            cell.name = 'cell' + i;
            cell.body.immovable = true;
            
            /*vCount.name = 'wall';
            this.physics.enable(vCount, Phaser.Physics.ARCADE);
            vCount.body.collideWorldBounds = true;
            vCount.body.immovable = true;*/
            console.log("Loading Wall - " + cell.name);
        }
        
        
        // Declare sprites
        snake = this.add.sprite(500, 410, 'gameSnake');
        
        // Example of sprite animation
        snake.anchor.setTo(0.5, 0.5);
        snake.frame = 1;
        snake.animations.add('slither', [0, 1], 2, true);
        
        character = this.add.sprite(this.world.centerX, 230, 'gameCharacter');
        // This means 'character' collides with 'cell' (cell is a group defined above)
        this.physics.enable([character, cell], Phaser.Physics.ARCADE);
        character.anchor.setTo(0.5);
        
            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.physics.arcade.enable([snake, character]);

            character.body.collideWorldBounds = true;
            snake.body.collideWorldBounds = true;
        
            snake.body.onCollide = new Phaser.Signal();
            snake.body.onCollide.add(this.loserFun, this);
        
// Coins
        totalCoin = 0; // Coin Counter... See nextCoin()
        
        coin = this.add.sprite(150 + 35, 300 + 35, 'gameCoin');
        coin.anchor.setTo(0.5, 0.5);
        coin.frame = 3;
        coin.animations.add('spinCoin', [0, 1, 2, 3], 4, true);
        coin.animations.play('spinCoin');
        
        this.physics.enable([coin, character], Phaser.Physics.ARCADE);
        
        coin.body.onCollide = new Phaser.Signal();
        coin.body.onCollide.add(this.collect, this);
    
        

        var leftWall = this.add.sprite(40, 29, 'time');
		var rightWall = this.add.sprite(this.world.width - 175, 35, 'score');
        

		//Add text
		var points = "0";
		var time = "2:00";

		var myStyle = {
			width: "150px",
			font: "35px Freckle Face",
			fill: "black",
			align: "left"
		};

		myPoints = this.add.text(this.world.width - 165, 59, points, myStyle);
        myTime = this.add.text(85, 59, time, myStyle);
		
		// Add button
		// The numbers given in parameters are the indexes of the frames, in this order: over, out, down
        tmpButtonBg = this.add.sprite(this.world.centerX, 0, 'btn_bg');
        tmpButtonBg.anchor.setTo(0.5, 0);
        
		tmpWinnerBtn = this.add.button(this.world.centerX - 60, 20, 'btn_winner', this.winnerFun, this, 1, 0, 2);
		tmpWinnerBtn.anchor.setTo(1, 0.5);
		
		tmpLoserBtn = this.add.button(this.world.centerX, 20, 'btn_loser', this.loserFun, this, 1, 0, 2);
		tmpLoserBtn.anchor.setTo(0.5, 0.5);
        
        tmpPointBtn = this.add.button(this.world.centerX + 60, 20, 'btn_point', this.addPoint, this, 1, 0, 2);
		tmpPointBtn.anchor.setTo(0, 0.5);
        
        currentScore = 0;
        
        // This counts down seconds
        gameSeconds = 120;
        timerSeconds = 0;
        secondsLeft = 0;
        // Create Timer Object
        timerObj = this.game.time.create(false);
        // Set a timer event to occur every 1 second
        timerObj.loop(1000, this.updateTimer, this);
        // Start the timer
        timerObj.start();
        

	},
    update: function() {    
    
    // Hide cursor only on this screen (flame is cursor)
//    this.game.canvas.style.cursor = "none";
    

    
    // If snake is within range, move to character
    if (this.physics.arcade.distanceBetween(snake, character)) {
        
        this.physics.arcade.moveToObject(snake, character, 60); // the snakes speed
        snake.rotation = this.physics.arcade.moveToXY(snake, character.x, character.y, 600, 600);
        snake.animations.play('slither');
    }
        
    // Use this to check if we are close to the door.    
    if (this.physics.arcade.distanceBetween(snake, character) > 200) {
        snake.body.velocity.setTo(0, 0);
        snake.animations.stop('slither');
    }
        
    // Use for dangerous obstacles
    this.physics.arcade.collide(character, snake, this.loserFun, null, this);
    snake.imovable = true;
        
    // Use for coin collection
    this.physics.arcade.collide(character, coin, this.collect, null, this);
    coin.imovable = true;
       
    // Use for obstacles, dangerous / not dangerous
    // Keep character from colliding
    this.physics.arcade.collide(cells, character);
    this.physics.arcade.collide(cells, snake);
    cells.imovable = true;
    
    // Update new cursor to move
    /*
    if (Phaser.Rectangle.contains(torch.body, this.input.x, this.input.y))
    {
        torch.body.velocity.setTo(0, 0);
    }
    else 
    {
        this.physics.arcade.moveToPointer(torch, 1000);
    }   
    */
        
    // Move character slowly to mouse position only on mousedown (Change to arrow keys)
    if (this.input.mousePointer.isDown)
    {
        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(character.body, this.input.x, this.input.y))
        {
            character.body.velocity.setTo(0, 0);
        }
        else 
        {
            //  400 is the speed it will move towards the mouse
            this.physics.arcade.moveToPointer(character, 250, Phaser.pointer, 0);
            character.rotation = this.physics.arcade.angleToPointer(character);
        }
    }
    else
    {
        character.body.velocity.setTo(0, 0);
    }
        
},
    collect: function(character, coin) {
        console.log("COINS!");
        
        // Find a random number between 15 and 20 to be added to the score.
        var randomnumber = Math.floor(Math.random() * (20 - 15 + 1)) + 15;
        currentScore = currentScore + randomnumber;
        myPoints.setText(currentScore);
        //remove sprite
        coin.destroy();
        
        this.nextCoin();
},
    nextCoin: function() {
        // The values of future coin coordinates are stored below
        coinCoordX = [5,  8, 6, 5, 2, 6, 10,  3];
        coinCoordY = [6, 11, 8, 4, 9, 5,  6, 10];
            // Place Coin, x75 for block, +35 for centering
            coin = this.add.sprite( coinCoordX[totalCoin] * 75 + 35, coinCoordY[totalCoin] * 75 + 35, 'gameCoin');
            coin.anchor.setTo(0.5, 0.5);
            coin.frame = 3;
            coin.animations.add('spinCoin', [0, 1, 2, 3], 4, true);
            coin.animations.play('spinCoin');

            this.physics.enable([coin, character], Phaser.Physics.ARCADE);

            coin.body.onCollide = new Phaser.Signal();
            coin.body.onCollide.add(this.collect, this);
        
            totalCoin = totalCoin + 1;
            console.log(totalCoin + " Coins collected");
            
            
        
            if (totalCoin > coinCoordX.length) {
                totalCoin = 0;
            }
    },
    updateTimer: function() {
        //console.log("Timer Running");
        timerSeconds ++;
        
        secondsLeft = gameSeconds - timerSeconds;
        displayMin = Math.floor(secondsLeft/60) % 60;
        displaySec = Math.floor(secondsLeft) % 60;
        
        if (displayMin < 10){
            displayMin = "0" + displayMin;
        }
        if (displaySec < 10){
            displaySec = "0" + displaySec;
        }
        
        myTime.setText(displayMin + ":" + displaySec);
        if (displayMin == 0 && displaySec ==0) {
            this.gameOver();
        }
    },
    addPoint: function() {
        console.log(currentScore);
        currentScore++
        myPoints.setText(currentScore);
    },
    gameOver: function() {
        if (currentScore > 200) {
            this.game.state.start('Winner');
        } else {
            this.game.state.start('Loser');
        }
    },
	winnerFun: function() {
        this.game.state.start('Winner');
	},
	loserFun: function() {
            console.log('YOU LOSE!');
            this.game.state.start('Loser');
	},

};



