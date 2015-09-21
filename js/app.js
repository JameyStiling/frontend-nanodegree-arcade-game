// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 101;
    this.height = 171;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //This moves the bug to the right until it hits the edge of the screen where it starts again
    var sideScreen = 505;
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < sideScreen){
            allEnemies[i].x = allEnemies[i].x + (allEnemies[i].speed*dt);
        }

    //start at left and give random speed
    else if (allEnemies[i].x >= sideScreen){
        allEnemies[i].x = -100;
        allEnemies[i].speed = getRandomNum(60,120);
        }
    }


//handle collision.  need to compensate for background space of images
for (i = 0; i < 3; i++){
    if (allEnemies[i].x < player.x + player.width-15 &&
        allEnemies[i].x + allEnemies[i].width-15 > player.x &&
        allEnemies[i].y < player.y + player.height-90 &&
        allEnemies[i].height-90 + allEnemies[i].y > player.y) {
            // collision detected! 0.1 seconds to delay the game for reset after death
            setTimeout(function(){
                player.x = 200;
                player.y = 606-171;
            }, 100);
        }
}
//     }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our Player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 606-171;
    this.width = 101;
    this.height = 171;
};

// Update the Player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
        if (this.y < -10){
            player.x = 200;
            this.y = 435;
        alert("You win!!!!!");
}
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleInput() methods needed for player.

//for PS4 contoller
Player.prototype.handlePS4controller = function(left, right, up, down){

    if (left == true && this.x > 0) {
        this.x = this.x -(50);
    }
    else if (up == true) {
        this.y = this.y - (50);
    }
    else if (right == true && this.x < 354) {
        this.x = this.x + (50);
    }
    else if (down == true && this.y < 435) {
        this.y = this.y + (50);
    }
};

//for keyboard input
Player.prototype.handleInput = function(key){

    if (key == 'left' && this.x > 0) {
        this.x = this.x -(50);
    }
    else if (key == 'up') {
        this.y = this.y - (50);
    }
    else if (key == 'right' && this.x < 354) {
        this.x = this.x + (50);
    }
    else if (key == 'down' && this.y < 435) {
        this.y = this.y + (50);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Use random number generator to give enemies unpredictable speed
var n = 3;
var allEnemies = [];
for (var i = 0; i < n; i++) {
    var x = 0
    var y = 50 + i * 75
    var speed = getRandomNum(50,100)
    allEnemies.push(new Enemy(x,y,speed));
    }

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Using Gamepad API for PS4 controller support
//checking to see if PS4 controller is connected
var hasGP = false;
var repGP;

    function canGame() {
        return "getGamepads" in navigator;
    }

var input = {
    left: false,
    right: false,
    up: false,
    down: false
}
$(document).ready(function() {

    if(canGame()) {

        var prompt = "To begin using your PS4 Controller, connect it and press any button!";
        $("#gamepadPrompt").text(prompt);

        $(window).on("gamepadconnected", function() {
            hasGP = true;
            $("#gamepadPrompt").html("Controller connected!");
            console.log("connection event");
            repGP = window.setInterval(reportOnGamepad,100);
        });

        $(window).on("gamepaddisconnected", function() {
            console.log("disconnection event");
            $("#gamepadPrompt").text(prompt);
            window.clearInterval(repGP);
        });

        //setup an interval for Chrome
        var checkGP = window.setInterval(function() {
            console.log('checkGP');
            if(navigator.getGamepads()[0]) {
                if(!hasGP) $(window).trigger("gamepadconnected");
                window.clearInterval(checkGP);
            }
        }, 500);
    }

});

// some of the gamepad code derived from the awesome tuts+ GamePad API tutorial

    function reportOnGamepad() {
        var gp = navigator.getGamepads()[0];
        var axeLF = gp.axes[0];
        var axeud = gp.axes[1];
                    if(axeLF < -0.5) {
                        input.left = true;
                        input.right = false;
                    } else if(axeLF > 0.5) {
                        input.left = false;
                        input.right = true;
                    } else {
                        input.left = false;
                        input.right = false;
                    }
                    if(axeud < -0.5) {
                        input.up = true;
                        input.down = false;
                    } else if(axeud > 0.5) {
                        input.up = false;
                        input.down = true;
                    } else {
                        input.up = false;
                        input.down = false;
                    }

         player.handlePS4controller(input.left, input.right, input.up, input.down);
    }

