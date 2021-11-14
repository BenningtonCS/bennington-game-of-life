import { convertPointsArrayToDict, convertPointsDictToArray, flipPoint, nextState } from './state.js';

//Drawing the infinite canvas grid
let canvas = document.querySelector('.field');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//state = {}
let state  = convertPointsArrayToDict([[1,0], [2,1], [0,2], [1,2], [2,2]]);

//how big one square is
const step = 25;

// input a state then draw it out
function draw(update = true) {
    // update state
    if (update == true) {
        state = nextState(state);
    };

    let left = 0.5 - Math.ceil(canvas.width / step) * step;
    let top = 0.5 - Math.ceil(canvas.height / step) * step;
    let right = 2 * canvas.width;
    let bottom = 2 * canvas.height;
    ctx.clearRect(left, top, right - left, bottom - top);
    ctx.beginPath();
    for (let x = left; x < right; x += step) {
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
    }
    for (let y = top; y < bottom; y += step) {
        ctx.moveTo(left, y);
        ctx.lineTo(right, y);
    }
    ctx.strokeStyle = "#888";
    ctx.stroke();
    ctx.fillStyle = 'red';

    // draw out state
    convertPointsDictToArray(state).forEach((point) => {
        const [x, y] = point;
        ctx.fillRect(x * step, y * step, step, step);
    });
}


// Mouse event handling:
let start;
const getPos = (e) => ({
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop
});

const reset = () => {
    start = null;
    //ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translation
    draw(false);
}

canvas.addEventListener("mousedown", e => {
    reset();
    start = getPos(e)
});

canvas.addEventListener("click", e => {
    //window.alert("This seems to be somewhat working.");
    const pos = getPos(e);
    const posX = pos.x / step;
    const posY = pos.y / step;
    //cell = [posX, posY];
    console.log(posX);
    flipPoint(posX, posY, state);
})

canvas.addEventListener("mouseup", reset);
canvas.addEventListener("mouseleave", reset);

canvas.addEventListener("mousemove", e => {
    // Only move the grid when we registered a mousedown event
    if (!start) return;
    let pos = getPos(e);
    // Move coordinate system in the same way as the cursor
    ctx.translate(pos.x - start.x, pos.y - start.y);
    draw(false);
    start = pos;
});

// loop on page load
const pause_btn = document.getElementById('pause-button');
const play_btn = document.getElementById('play-button');
const step_btn = document.getElementById('step-button');
play_btn.style.display = 'none';
let intervalID = setInterval(draw, 100);

function playGame() {
    intervalID = setInterval(draw, 100);
    pause_btn.style.display = 'inline';
    play_btn.style.display = 'none';
}

function pauseGame() {
    clearInterval(intervalID);
    pause_btn.style.display = 'none';
    play_btn.style.display = 'inline';
}

play_btn.addEventListener("click", playGame);
pause_btn.addEventListener("click", pauseGame);
step_btn.addEventListener("click", function() { draw(true) });

draw();
