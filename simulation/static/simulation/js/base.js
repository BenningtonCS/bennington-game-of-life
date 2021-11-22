import { convertPointsArrayToDict, convertPointsDictToArray, flipPoint, nextState } from './state.js';

//Drawing the infinite canvas grid
let canvas = document.querySelector('.field');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// initial state
let state = {}
// let state  = convertPointsArrayToDict([[1,0], [2,1], [0,2], [1,2], [2,2]]);

//how big one square is
const step = 25;

//how fast we want to scroll
const scroll = 50;

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
    ctx.strokeStyle = "#b59481";
    ctx.stroke();
    ctx.fillStyle = '#A61F38';

    // draw out state
    convertPointsDictToArray(state).forEach((point) => {
        const [x, y] = point;
        ctx.fillRect(x * step, y * step, step, step);
    });
    //When state is empty, pause the game
    if (Object.keys(state).length === 0) { pauseGame() };
}


// Mouse event handling:
let start;
const getPos = (e) => ({
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop
});

const reset = () => {
    start = null;
    // ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translation
    draw(false);
}

let isDrag = false;
let mouseDownStart = Date.now();

canvas.addEventListener("mousedown", e => {
    reset();
    start = getPos(e);

    // initialize some values for dragging tracking
    isDrag = false;
    mouseDownStart = Date.now();
});

canvas.addEventListener("mousemove", e => {
    // Only move the grid when we registered a mousedown event
    if (!start) return;
    let pos = getPos(e);

    // indicate that the user is dragging if mouse has been moving for more than 0.1s
    if (Date.now() - mouseDownStart > 100) {
        isDrag = true;
    };

    // store grid offset to handle mouse click position after scroll
    gridOffset['x'] += pos.x - start.x;
    gridOffset['y'] += pos.y - start.y;

    // Move coordinate system in the same way as the cursor
    ctx.translate(pos.x - start.x, pos.y - start.y);
    draw(false);
    start = pos;
});

// adding point on mouseup if isDrag = false
canvas.addEventListener("mouseup", e => {
    if (!isDrag) {
        const pos = getPos(e);
        const posX = Math.floor(pos.x/ step  - gridOffset['x']/ step);
        const posY = Math.floor(pos.y / step - gridOffset['y']/ step);
        flipPoint(posX, posY, state);
    }
    reset(); // redraw
});

canvas.addEventListener("mouseleave", reset);

//storing the canvas offset for later use
let gridOffset = {'x':0, 'y':0};

// keystroke movement implementation
// document.onkeydown = checkKey;
// function checkKey(e) {

//     e = e || window.event;

//     if (e.keyCode == '38') {
//       gridOffset['y'] += scroll;
//       ctx.translate(0,scroll);
//       draw(false);
//         // up arrow
//     }
//     else if (e.keyCode == '40') {
//       gridOffset['y'] -= scroll;
//       ctx.translate(0,-scroll);
//       draw(false);
//         // down arrow
//     }
//     else if (e.keyCode == '37') {
//       gridOffset['x'] += scroll;
//       ctx.translate(scroll,0);
//       draw(false);
//        // left arrow
//     }
//     else if (e.keyCode == '39') {
//       gridOffset['x'] -= scroll;
//       ctx.translate(-scroll,0);
//       draw(false);
//        // right arrow
//     }

//     else if (e.keyCode == '87') {
//       gridOffset['y'] += scroll;
//       ctx.translate(0,scroll);
//       draw(false);
//         // w
//     }
//     else if (e.keyCode == '83') {
//       gridOffset['y'] -= scroll;
//       ctx.translate(0,-scroll);
//       draw(false);
//         // down arrow
//     }
//     else if (e.keyCode == '65') {
//       gridOffset['x'] += scroll;
//       ctx.translate(scroll,0);
//       draw(false);
//        // left arrow
//     }
//     else if (e.keyCode == '68') {
//       gridOffset['x'] -= scroll;
//       ctx.translate(-scroll,0);
//       draw(false);
//        // right arrow
//     }
// }

// loop on page load
const pause_btn = document.getElementById('pause-button');
const play_btn = document.getElementById('play-button');
const step_btn = document.getElementById('step-button');
const clear_btn = document.getElementById('clear-button');
const add_btn = document.getElementById('add-button');

// default to pause at start
pause_btn.style.display = 'none';
let intervalID;

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

function clearGame() {
    state = {};
    draw(false); //redraw
}

play_btn.addEventListener("click", playGame);
pause_btn.addEventListener("click", pauseGame);
step_btn.addEventListener("click", function() { draw(true) });
clear_btn.addEventListener("click", clearGame);

const load_buttons = document.getElementsByClassName("load-button")
for (let button of load_buttons) {
    button.addEventListener("click", (e) => {
        pauseGame()
        state = convertPointsArrayToDict(JSON.parse(button.id));
        reset();
    });
};

add_btn.addEventListener("click", (e) => {
    $.ajax({
        type: "POST",
        url: "/",
        data: {
            'name': state,
            'pattern': state
        },
        success: function () {
            console.log("sucess")
        }
    });
    return false;
});
      
draw();
