var MVC = {};

MVC.model = function () {

}


MVC.model.player = function () {
    this._playerY = 40;
    this._playerWidth = 10;
    this._playerHeight = 100;
    this._score = 0;

    return this;
}

MVC.model.player.prototype = {
    getY: function () {
        return this._playerY;
    },
    setY: function (value) {
        this._playerY = value;
    },
    getPlayerWidth: function () {
        return this._playerWidth;
    },
    getPlayerHeight: function () {
        return this._playerHeight;
    },
    getScore: function () {
        return this._score;
    },
    setScore: function (value) {
        this._score = value;
    }
}


/* Пытался относледоваться, но чет не работает */
MVC.model.enemy = function () {
    /*MVC.model.player.call(this);*/

    this._playerY = 40;
    this._playerWidth = 10;
    this._playerHeight = 100;
    this._score = 0;
    this._speedOfDefending = 6;

    return this;
}

/*MVC.model.enemy.prototype = Object.create(MVC.model.player.prototype);
MVC.model.enemy.prototype.constructor = MVC.model.enemy;*/


MVC.model.enemy.prototype = {
    getY: function () {
        return this._playerY;
    },
    setY: function (value) {
        this._playerY = value;
    },
    getPlayerWidth: function () {
        return this._playerWidth;
    },
    getPlayerHeight: function () {
        return this._playerHeight;
    },
    getScore: function () {
        return this._score;
    },
    setScore: function (value) {
        this._score = value;
    },
    setSpeedOfDefending: function (value) {
        this._speedOfDefending = value;
    },
    getSpeedOfDefending: function () {
        return this._speedOfDefending;
    },
    IncreaseSpeedOfDefending: function (value) {
        if (value > 3) {
            this._speedOfDefending = 8;
        }
        if (value > 5) {
            this._speedOfDefending = 10;
        }
    }
}


MVC.model.ball = function () {
    this._ballX = 50;
    this._ballY = 50;
    this._ballSize = 6;

    this._xVelocity = 4;
    this._yVelocity = 4;

    return this;
}

MVC.model.ball.prototype = {
    getBallX: function () {
        return this._ballX;
    },
    setBallX: function (value) {
        this._ballX = value;
    },
    getBallY: function () {
        return this._ballY;
    },
    setBallY: function (value) {
        this._ballY = value;
    },
    getBallSize: function () {
        return this._ballSize;
    },
    getXVelocity: function () {
        return this._xVelocity;
    },

    setXVelocity: function (value) {
        this._xVelocity = value;
    },
    getYVelocity: function () {
        return this._yVelocity;
    },
    setYVelocity: function (value) {
        this._yVelocity = value;
    },
    inverseVerticalDirection: function () {
        this._yVelocity = -this._yVelocity;
    },
    inverseHorizontalDirection: function () {
        this._xVelocity = -this._xVelocity;
    },
    resetBall: function (gameScreenWidth, gameScreenHeigth) {
        this._ballX = gameScreenWidth / 2;
        this._ballY = gameScreenHeigth / 2;
        this._xVelocity = -this._xVelocity;
        this._yVelocity = 3;
    }
}


MVC.view = function () {
    this._canvas = document.getElementById('gc');
    this._canvasContext = this._canvas.getContext('2d');

    return this;
}

MVC.view.prototype = {
    getCanvas: function () {
        return this._canvas;
    },
    getCanvasContext: function () {
        return this._canvasContext;
    },
    drawGameScreen: function (enemyY, playerY, playerScore, enemyScore, playerWidth, playerHeight, ballX, ballY, ballSize) {
        this._canvasContext.fillStyle = 'black';
        this._canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._canvasContext.fillStyle = 'white';
        this._canvasContext.fillRect(0, playerY, playerWidth, playerHeight);
        this._canvasContext.fillRect(this._canvas.width - playerWidth, enemyY, playerWidth, playerHeight);
        this._canvasContext.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize)
        this._canvasContext.fillText(playerScore, 100, 100);
        this._canvasContext.fillText(enemyScore, 400, 100)
    }
}

MVC.controller = function () {
    player = new MVC.model.player();
    enemy = new MVC.model.enemy();
    ball = new MVC.model.ball();
    view = new MVC.view();

    view.getCanvas().addEventListener('mousemove', function (e) {
        player.setY(e.clientY - player.getPlayerHeight() * 2);
    });

    return this;
}

MVC.controller.prototype = {
    update: function () {
        console.log('running...');
        ball.setBallX(ball.getBallX() + ball.getXVelocity());
        ball.setBallY(ball.getBallY() + ball.getYVelocity());
        ball.r

        if (ball.getBallY() < 0 && ball.getYVelocity() < 0) {
            ball.inverseHorizontalDirection();
        }

        if (ball.getBallY() > view.getCanvas().height && ball.getYVelocity() > 0) {
            ball.inverseVerticalDirection();
        }

        if (ball.getBallX() < 0) {
            if (ball.getBallY() > player.getY() && ball.getBallY() < player.getY() + player.getPlayerHeight()) {
                ball.inverseHorizontalDirection();
                dy = ball.getBallY() - (player.getY() + player.getPlayerHeight() / 2);
                ball.setYVelocity(dy * 0.3);
            } else {
                enemy.setScore(enemy.getScore() + 1);
                ball.resetBall(view.getCanvas().width, view.getCanvas().height);
            }
        }

        if (ball.getBallX() > view.getCanvas().width) {
            if (ball.getBallY() > enemy.getY() && ball.getBallY() < enemy.getY() + enemy.getPlayerHeight()) {
                ball.inverseHorizontalDirection();
                dy = ball.getBallY() - (enemy.getY() + enemy.getPlayerHeight() / 2);
                ball.setYVelocity(dy * 0.3);
            } else {
                player.setScore(player.getScore() + 1);
                ball.resetBall(view.getCanvas().width, view.getCanvas().height);
            }
        }

        if (enemy.getY() + enemy.getPlayerHeight() / 2 < ball.getBallY()) {

            enemy.setY(enemy.getY() + enemy.getSpeedOfDefending());
        }

        if (enemy.getY() + enemy.getPlayerHeight() / 2 > ball.getBallY()) {
            enemy.setY(enemy.getY() - enemy.getSpeedOfDefending());
        }

        enemy.IncreaseSpeedOfDefending(player.getScore());

        view.drawGameScreen(enemy.getY(), player.getY(), player.getScore(), enemy.getScore(),
            player.getPlayerWidth(), player.getPlayerHeight(), ball.getBallX(), ball.getBallY(), ball.getBallSize());
    },
    getView: function () {
        return view;
    },
    getPlayer: function () {
        return player;
    },
    getEnemy: function () {
        return enemy;
    },
    getBall: function () {
        return ball;
    }
}

window.onload = function () {
    controller = new MVC.controller();

    setInterval(controller.update, 1000 / 30);
}
