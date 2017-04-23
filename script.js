var MVC = {};

MVC.model = function () {
    this.player = function () {
        this.playerY = 40;
        this.playerWidth = 10;
        this.playerHeight = 100;
        this.score = 0;

        this.setPlayerY = function (positionY) {
            this.playerY = positionY;
        };
        this.getPlayerY = function () {
            return this.playerY;
        };
        this.setScore = function (score) {
            this.score = score;
        };
        this.getScore = function () {
            return this.score;
        };
        this.getPlayerHeight = function () {
            return this.playerHeight;
        }
        this.getPlayerWidth = function () {
            return this.playerWidth;
        }
    }
    this.enemy = function () {
        player.call(this);

        this.speedOfDefending = 6;

        this.setSpeedOfDefending = function (speed) {
            this.speedOfDefending = speed;
        }
        this.getSpeedOfDefending = function () {
            return this.speedOfDefending;
        }
    }
    this.ball = function () {
        this.ballX = 50;
        this.ballY = 50;
        this.ballSize = 6;

        this.xVelocity = 4;
        this.yVelocity = 4;

        this.setBallX = function (x) {
            this.ballX = x;
        }
        this.getBallX = function () {
            return this.ballX;
        }
        this.setBallY = function (y) {
            this.ballY = y;
        }
        this.getBallY = function () {
            return this.ballY;
        }
        this.setXVelocity = function (xVelocity) {
            this.xVelocity = xVelocity;
        }
        this.getXVelocity = function () {
            return this.xVelocity;
        }
        this.setYVelocity = function (yVelocity) {
            this.yVelocity = yVelocity;
        }
        this.getYVelocity = function () {
            return this.yVelocity;
        }
        this.getBallSize = function () {
            return this.ballSize;
        }
    }
}

var ball = new Ball();
var player = new Player();
var enemy = new Enemy();


window.onload = function () {
    canvas = document.getElementById('gc');
    canvasContext = canvas.getContext('2d');
    setInterval(update, 1000 / 30);
    canvas.addEventListener('mousemove', function (e) {
        player.setPlayerY(e.clientY - player.getPlayerHeight() * 2);
    });
}

function resetBall() {
    ball.setBallX(canvas.width / 2);
    ball.setBallY(canvas.height / 2);
    ball.setXVelocity(-ball.getXVelocity());
    ball.setYVelocity(3);
}


function update() {
    ball.setBallX(ball.getBallX() + ball.getXVelocity());
    ball.setBallY(ball.getBallY() + ball.getYVelocity());

    if (ball.getBallY() < 0 && ball.getYVelocity() < 0) {
        ball.setYVelocity(-ball.getYVelocity())
    }

    if (ball.getBallY() > canvas.height && ball.getYVelocity() > 0) {
        ball.setYVelocity(-ball.getYVelocity())
    }


    if (ball.getBallX() < 0) {
        if (ball.getBallY() > player.getPlayerY() && ball.getBallY() < player.getPlayerY() + player.getPlayerHeight()) {
            ball.setXVelocity(-ball.getXVelocity());
            dy = ball.getBallY() - (player.getPlayerY() + player.getPlayerHeight() / 2);
            ball.setYVelocity(dy * 0.3);
        } else {
            enemy.setScore(enemy.getScore() + 1)
            resetBall();
        }
    }

    if (ball.getBallX() > canvas.width) {
        if (ball.getBallY() > enemy.getPlayerY() && ball.getBallY() < enemy.getPlayerY() + enemy.getPlayerHeight()) {
            ball.setXVelocity(-ball.getXVelocity());
            dy = ball.getBallY() - (enemy.getPlayerY() + enemy.getPlayerHeight() / 2);
            ball.setYVelocity(dy * 0.3);
        } else {
            player.setScore(player.getScore() + 1)
            resetBall();
        }
    }

    if (enemy.getPlayerY() + enemy.getPlayerHeight() / 2 < ball.getBallY()) {
        enemy.setPlayerY(enemy.getPlayerY() + enemy.getSpeedOfDefending());
    }

    if (enemy.getPlayerY() + enemy.getPlayerHeight() / 2 > ball.getBallY()) {
        enemy.setPlayerY(enemy.getPlayerY() - enemy.getSpeedOfDefending());
    }

    if (player.getScore() > 3) {
        enemy.setSpeedOfDefending(8);
    }
    if (player.getScore() > 5) {
        enemy.setSpeedOfDefending(10);
    }

    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, player.getPlayerY(), player.getPlayerWidth(), player.getPlayerHeight());
    canvasContext.fillRect(canvas.width - player.getPlayerWidth(), enemy.getPlayerY(), enemy.getPlayerWidth(), enemy.getPlayerHeight());
    canvasContext.fillRect(ball.getBallX() - ball.getBallSize() / 2, ball.getBallY() - ball.getBallSize() / 2, ball.getBallSize(), ball.getBallSize());
    canvasContext.fillText(player.getScore(), 100, 100);
    canvasContext.fillText(enemy.getScore(), canvas.width - 100, 100);
}
