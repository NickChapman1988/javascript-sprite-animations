// canvas element to contain animation
const canvas = document.getElementById('canvas1');
// context of canvas element
const ctx = canvas.getContext('2d');
// set values for canvas width and height
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// adds new image element containing animation frames
const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

// width and height of each sprite
const spriteWidth = 575;
const spriteHeight = 523;

// defines playerState variable to change animation row
let playerState = 'bite';

// cycles through row of animation frames starting from 0
let gameFrame = 0;

// slows rate of animation cycling
const staggerFrames = 5;

// Array containing sprite animation images
const spriteAnimations = [];
// Array of animation states, with no. of frames in each state
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    },
];
// for loop to add x and y coordinates for each frame of each state
animationStates.forEach((state, index) => {
    // empty array to contain coordinates
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        // calculates X and Y co-ordinates for each frame
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        // push x and y to loc array
        frames.loc.push({x: positionX, y: positionY});
    }
    // set key-value of spriteAnimations array to contain loc array of coordinates
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

// function for animation
function animate(){
    // positions animation within canvas (centered)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillRect(0,50,100,100);
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY,
    spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        
    gameFrame++;
    requestAnimationFrame(animate);
};

animate();