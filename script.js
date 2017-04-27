var MVC = {};

MVC.model = function () {

}


MVC.model.player = function () {
    this._playerY = 40;
    this._playerWidth = 10;
    this._playerHeight = 100;
    this._score = 0;
}

MVC.model.player.prototype.getY = function () {
    return this._playerY;
}

MVC.model.player.prototype.setY = function (value) {
    this._playerY = value;
}

MVC.model.player.prototype.getPlayerWidth = function () {
    return this._playerWidth;
}

MVC.model.player.prototype.getPlayerHeight = function () {
    return this._playerHeight;
}

MVC.model.player.prototype.getScore = function () {
    return this._score;
}

MVC.model.player.prototype.setScore = function (value) {
    this._score = value;
}



MVC.model.enemy = function () {
    MVC.model.player.call(this);
    this._speedOfDefending = 6;
}

MVC.model.enemy.prototype.setSpeedOfDefending = function (value) {
    this._speedOfDefending = value;
}

MVC.model.enemy.prototype.getSpeedOfDefending = function () {
    return this._speedOfDefending;
}

MVC.model.enemy.prototype.IncreaseSpeedOfDefending = function (value) {
    if (value > 3) {
        this._speedOfDefending = 8;
    }
    if (value > 5) {
        this._speedOfDefending = 10;
    }
}



MVC.model.ball = function () {
    this._ballX = 50;
    this._ballY = 50;
    this._ballSize = 6;

    this._xVelocity = 4;
    this._yVelocity = 4;
}

MVC.model.ball.prototype.getBallX = function () {
    return this._ballX;
}

MVC.model.ball.prototype.setBallX = function (value) {
    this._ballX = value;
}

MVC.model.ball.prototype.getBallY = function () {
    return this._ballY;
}

MVC.model.ball.prototype.setBallY = function (value) {
    this._ballY = value;
}

MVC.model.ball.prototype.getBallSize = function () {
    return this._ballSize;
}

MVC.model.ball.prototype.getXVelocity = function () {
    return this._xVelocity;
}

MVC.model.ball.prototype.setXVelocity = function (value) {
    this._xVelocity = value;
}

MVC.model.ball.prototype.getYVelocity = function () {
    return this._yVelocity;
}

MVC.model.ball.prototype.setYVelocity = function (value) {
    this._yVelocity = value;
}

MVC.model.ball.prototype.inverseVerticalDirection = function () {
    this._yVelocity = -this._yVelocity;
}

MVC.model.ball.prototype.inverseHorizontalDirection = function () {
    this._xVelocity = -this._xVelocity;
}

MVC.model.ball.prototype.resetBall = function (gameScreenWidth, gameScreenHeigth) {
    this._ballX = gameScreenWidth / 2;
    this._ballY = gameScreenHeigth / 2;
    this._xVelocity = -this._xVelocity;
    this._yVelocity = 3;
}



MVC.view = function () {
    this._canvas = document.getElementById('gc');
    this._canvasContext = this._canvas.getContext('2d');
}

MVC.view.prototype.getCanvas = function () {
    return this._canvas;
}

MVC.view.prototype.getCanvasContext = function () {
    return this._canvasContext;
}

MVC.view.prototype.drawGameScreen = function (enemyY, playerY, playerScore, enemyScore, playerWidth, playerHeight, ballX, ballY, ballSize) {
    this._canvasContext.fillStyle = 'black';
    this._canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._canvasContext.fillStyle = 'white';
    this._canvasContext.fillRect(0, playerY, playerWidth, playerHeight);
    this._canvasContext.fillRect(this._canvas.width - playerWidth, enemyY, playerWidth, playerHeight);
    this._canvasContext.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize)
    this._canvasContext.fillText(playerScore, 100, 100);
    this._canvasContext.fillText(enemyScore, 100, 100)
}



MVC.controller = function () {
    this._player = new MVC.model.player();
    this._enemy = new MVC.model.enemy();
    this._ball = new MVC.model.ball();
    this._view = new MVC.view();

    this._view.getCanvas().addEventListener('mousemove', function (e) {
        this._player.setY(e.clientY - this._player.getPlayerHeight() * 2);
    });
}

MVC.controller.prototype.update = function () {
    this._ball.setBallX(this._ball.getBallX() + this._ball.getXVelocity());
    this._ball.setBallY(this._ball.getBallY() + this._ball.getYVelocity());

    if (this._ball.getBallY() < 0 && this._ball.getYVelocity() < 0) {
        this._ball.inverseHorizontalDirection();
    }

    if (this._ball.getBallY() > this._view.getCanvas().height && this._ball.getYVelocity() > 0) {
        this._ball.inverseVerticalDirection();
    }

    if (this._ball.getBallX() < 0) {
        if (this._ball.getBallY() > this._player.getY() && this._ball.getBallY() < this._player.getY() + this._player.getPlayerHeight()) {
            this._ball.inverseHorizontalDirection();
            dy = this._ball.getBallY() - (this._player.getY() + this._player.getPlayerHeight() / 2);
            this._ball.setYVelocity(dy * 0.3);
        } else {
            this._enemy.setScore(this._enemy.getScore() + 1);
            this._ball.resetBall();
        }
    }

    if (this._ball.getBallX() > this._view.getCanvas().width) {
        if (this._ball.getBallY() > this._enemy.getY() && this._ball.getBallY() < this._enemy.getY() + this._enemy.getPlayerHeight()) {
            this._ball.inverseHorizontalDirection();
            dy = this._ball.getBallY() - (this._enemy.getY() + this._enemy.getPlayerHeight() / 2);
            this._ball.setYVelocity(dy * 0.3);
        } else {
            this._player.setScore(this._player.getScore() + 1)
            this._ball.resetBall();
        }
    }

    if (this._enemy.getY() + this._enemy.getPlayerHeight() / 2 < this._ball.getBallY()) {
        this._enemy.setY(this._enemy.getY() + this._enemy.getSpeedOfDefending());
    }

    if (this._enemy.getY() + this._enemy.getPlayerHeight() / 2 > this._ball.getBallY()) {
        this._enemy.setY(this._enemy.getY() - this._enemy.getSpeedOfDefending());
    }

    this._enemy.IncreaseSpeedOfDefending(this._player.getScore());

    this._view.drawGameScreen(this._enemy.getY(), this._player.getY(), this._player.getScore(), this._enemy.getScore(),
        this._player.getPlayerWidth(), this._player.getPlayerHeight(), this._ball.getBallX(), this._ball.getBallY(), this._ball.getBallSize());

}


window.onload = function () {
    controller = new MVC.controller();

    setInterval(controller.update(), 1000 / 30);
}
