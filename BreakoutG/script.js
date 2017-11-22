var canvas = document.getElementById("mycanvas");
var ctxt = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 100;
var ballRadius = 15;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - paddleHeight;
var rightPressed = false;
var leftPressed = false;
var paddleTouch = 0;
var bricksRowCount = 4;
var bricksColumnCount = 6;
var bricksWidth = 75;
var bricksHeight = 20;
var bricksPadding = 10;
var bricksOffsetTop = 30;
var bricksOffsetLeft = 30;
var bricks = [];
var score = 0;
var lives = 3;

for (var i = 0; i < bricksColumnCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < bricksRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}

function drawBricks() {
    for (i = 0; i < bricksColumnCount; i++) {
        for (j = 0; j < bricksRowCount; j++) {
            var brick = bricks[i][j];
            if (brick.status == 1) {
                var brickX = (i * (bricksWidth + bricksPadding)) + bricksOffsetLeft;
                var brickY = (j * (bricksHeight + bricksPadding)) + bricksOffsetTop;
                brick.x = brickX;
                brick.y = brickY;
                ctxt.beginPath();
                ctxt.rect(brickX, brickY, bricksWidth, bricksHeight);
                ctxt.fillStyle = "#FF0000";
                ctxt.fill();
                ctxt.closePath();
            }
        }
    }
}
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);
setInterval(draw, 10);

function drawCircle() {
    ctxt.beginPath();
    ctxt.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctxt.fillStyle = "#FFF000";
    ctxt.fill();
    ctxt.closePath();
}

function drawPaddle() {
    ctxt.beginPath();
    ctxt.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctxt.fillStyle = "#2E86C1";
    ctxt.fill();
    ctxt.strokeStyle = "#FF0000";
    ctxt.stroke();
    ctxt.closePath();
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    // console.log(e.clientX);
    var relativeX = e.clientX - canvas.offsetLeft;
    // console.log(relativeX);
    if (relativeX > 0 && relativeX < paddleWidth) {
        paddleX = relativeX - paddleWidth / 2;
        // console.log(paddleX);
    }
}

function GetScore() {
    ctxt.font = "16px Arial";
    ctxt.fillStyle = "#0095DD";
    ctxt.fillText("Score:" + score, 8, 20);
}

function GetLives() {
    ctxt.font = "16px Arial";
    ctxt.fillStyle = "#0095DD";
    ctxt.fillText("Lives:" + lives, 90, 20);
}

function CollisionDetection() {
    for (c = 0; c < bricksColumnCount; c++) {
        for (r = 0; r < bricksRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if ((x > b.x && x < b.x + bricksWidth) && (y > b.y && y < b.y + bricksHeight)) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == bricksRowCount * bricksColumnCount) {
                        alert("You won!!!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function draw() {
    ctxt.clearRect(0, 0, canvas.width, canvas.height);

    drawCircle();
    drawPaddle();
    drawBricks();
    GetScore();
    GetLives();
    CollisionDetection();
    if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            //alert("GAME OVER!!!");
            lives--;
            if (!lives) {
                alert("GAME OVER!!");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    } else if (y + dy <= ballRadius) {
        dy = -dy;
    }
    if (x + dx > canvas.width - ballRadius || x + dx <= ballRadius) {
        dx = -dx;
    }

    if (rightPressed && paddleX < (canvas.width - paddleWidth)) {
        paddleX = paddleX + 6; //for convienence
    }
    if (leftPressed && paddleX > 0) {
        paddleX = paddleX - 6; //for convienence
    }
    x += dx;
    y += dy;
}