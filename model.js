function Player() {
    var playerY = 40;
    var playerWidth = 10;
    var playerHeight = 100;
    var score = 0;

    this.setPlayerY = function (positionY) {
        playerY = positionYl
    };
    this.getPlayerY = function () {
        return playerY;
    };
    this.setScore = function (score) {
        score = score;
    };
    this.getScore = function () {
        return score;
    };
}

function Enemy() {
    Player.call(this);

    var speedOfDefending = 6;

    this.setSpeedOfDefending(speed) {
        speedOfDefending = speed;
    }
}

function Ball() {
    var ballX = 50;
    var ballY = 50;
    var ballSize = 6;

    var xVelocity = 4;
    var yVelocity = 4;

    this.setBallX(x) {
        ballX = x;
    }
    this.getBallX() {
        return ballX;
    }
    this.setBallY(y) {
        ballY = y;
    }
    this.getBallY() {
        return ballY;
    }
    this.setXVelocity(xVelocity) {
        xVelocity = xVelocity;
    }
    this.getXVelocity() {
        return xVelocity;
    }
    this.setYVelocity(yVelocity) {
        yVelocity = yVelocity;
    }
    this.getYVelocity() {
        return yVelocity;
    }
}