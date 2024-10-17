const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    speed: 0,
    maxSpeed: 5,
};

let asteroids = [];
let bullets = [];
let score = 0;

function init() {
    createAsteroids(5);
    requestAnimationFrame(gameLoop);
}

function createAsteroids(num) {
    for (let i = 0; i < num; i++) {
        asteroids.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 30 + Math.random() * 20,
        });
    }
}

function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(10, 10);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();
}

function drawAsteroids() {
    asteroids.forEach((asteroid) => {
        ctx.beginPath();
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'gray';
        ctx.fill();
    });
}

function drawBullets() {
    bullets.forEach((bullet) => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    });
}

function update() {
    // Move ship
    ship.x += Math.cos(ship.angle) * ship.speed;
    ship.y += Math.sin(ship.angle) * ship.speed;

    // Keep ship within bounds
    if (ship.x < 0) ship.x = canvas.width;
    if (ship.x > canvas.width) ship.x = 0;
    if (ship.y < 0) ship.y = canvas.height;
    if (ship.y > canvas.height) ship.y = 0;

    // Update bullets
    bullets.forEach((bullet, index) => {
        bullet.x += Math.cos(bullet.angle) * bullet.speed;
        bullet.y += Math.sin(bullet.angle) * bullet.speed;

        // Remove bullets that are off screen
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawShip();
    drawAsteroids();
    drawBullets();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
        ship.speed = Math.min(ship.speed + 0.1, ship.maxSpeed);
    }
    if (e.code === 'ArrowDown') {
        ship.speed = Math.max(ship.speed - 0.1, 0);
    }
    if (e.code === 'ArrowLeft') {
        ship.angle -= 0.1;
    }
    if (e.code === 'ArrowRight') {
        ship.angle += 0.1;
    }
    if (e.code === 'Space') {
        bullets.push({
            x: ship.x,
            y: ship.y,
            angle: ship.angle,
            speed: 7,
        });
    }
});

init();
