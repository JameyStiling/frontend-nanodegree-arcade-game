// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 50;
    this.speed = 60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //This moves the bug to the right until it hits the edge of the screen where it starts again
    if (this.x < 505){
    this.x = this.x + (this.speed*dt);
}
    else if (this.x >= 505){
        this.x = 0
    }

//     //try to handle collision
//     if (this.x === Player.x){
// this.x = this.x - (this.speed*dt);
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
    this.x = 0;
    this.y = 606-171;


};

// Update the Player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
        if (this.y < 0){
    this.y = 606-171
}
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//
// a handleInput() method needed for player.
Player.prototype.handleInput = function(key){

if (key == 'left' && this.x > 0) {
    this.x = this.x -(10);
}
else if (key == 'up'){
    this.y = this.y - (10);
}
else if (key == 'right' && this.x < 404){
    this.x = this.x + (10);
}
else if (key == 'down'){
    this.y = this.y + (10);
}
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var n = 3;
var allEnemies = new Array();
for (var i = 0; i < n; i++)
    allEnemies.push(new Enemy());
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
