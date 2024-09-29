const player = document.getElementById('player');
const maze = document.getElementById('maze');

// Player's initial position
let playerPosition = { x: 10, y: 10 };

// Ensure the player's initial position is correctly set
player.style.left = `${playerPosition.x}px`;
player.style.top = `${playerPosition.y}px`;

// Define even more complex walls for the maze
const walls = [
    { x: 0, y: 0, width: 400, height: 10 },    // Top wall
    { x: 0, y: 0, width: 10, height: 400 },    // Left wall
    { x: 0, y: 390, width: 400, height: 10 },  // Bottom wall
    { x: 390, y: 0, width: 10, height: 400 },  // Right wall

    // Intricate walls and paths
    { x: 30, y: 30, width: 330, height: 10 },   // First horizontal wall near top
    { x: 30, y: 30, width: 10, height: 100 },   // First vertical wall
    { x: 30, y: 130, width: 100, height: 10 },  // Horizontal in the middle
    { x: 120, y: 40, width: 10, height: 100 },  // Vertical wall blocking the path
    { x: 120, y: 140, width: 80, height: 10 },  // Horizontal passage
    { x: 200, y: 40, width: 10, height: 110 },  // Vertical blocker
    
    { x: 30, y: 200, width: 150, height: 10 },  // Horizontal dead-end
    { x: 30, y: 200, width: 10, height: 100 },  // Vertical leading to dead-end
    { x: 100, y: 260, width: 10, height: 100 }, // Vertical wall near bottom
    { x: 100, y: 300, width: 150, height: 10 }, // Horizontal lower maze

    { x: 250, y: 30, width: 10, height: 200 },  // Long vertical wall
    { x: 250, y: 200, width: 50, height: 10 },  // Horizontal between vertical walls
    { x: 290, y: 80, width: 10, height: 130 },  // Vertical wall near the right

    { x: 200, y: 300, width: 200, height: 10 },  // Horizontal near bottom
    { x: 250, y: 300, width: 10, height: 50 },  // Vertical path blocker
    { x: 300, y: 250, width: 10, height: 100 },  // Vertical wall near goal

    // Tight corridors for increased difficulty
    { x: 170, y: 170, width: 10, height: 80 },  // Vertical tight wall
    { x: 170, y: 230, width: 100, height: 10 }, // Horizontal near center

    { x: 330, y: 70, width: 10, height: 200 },  // Long vertical to block path
    { x: 170, y: 320, width: 150, height: 10 }, // Horizontal towards the goal

    { x: 60, y: 350, width: 300, height: 10 },  // Final horizontal maze near the bottom

    // Block the way down from starting position
    { x: 10, y: 30, width: 20, height: 10 },    // Wall directly below starting position
];

// Create wall elements
walls.forEach(createWall);

function createWall(wall) {
    const wallDiv = document.createElement('div');
    wallDiv.className = 'wall';
    wallDiv.style.left = `${wall.x}px`;
    wallDiv.style.top = `${wall.y}px`;
    wallDiv.style.width = `${wall.width}px`;
    wallDiv.style.height = `${wall.height}px`;
    maze.appendChild(wallDiv);
}

// Function to move the player
function movePlayer(direction) {
    const newPosition = { ...playerPosition };

    switch (direction) {
        case 'ArrowUp':
            newPosition.y -= 10;
            break;
        case 'ArrowDown':
            newPosition.y += 10;
            break;
        case 'ArrowLeft':
            newPosition.x -= 10;
            break;
        case 'ArrowRight':
            newPosition.x += 10;
            break;
    }

    // Check for collisions and boundaries
    if (!isCollidingWithWall(newPosition) && isWithinBounds(newPosition)) {
        updatePlayerPosition(newPosition);
    }

    // Check if the player reached the goal
    if (isCollidingWithGoal(newPosition)) {
        alert('Congratulations! You reached the goal!');
        resetPlayer();
    }
}

function updatePlayerPosition(position) {
    playerPosition = position;
    player.style.top = `${playerPosition.y}px`;
    player.style.left = `${playerPosition.x}px`;
}

function isCollidingWithWall(position) {
    const playerWidth = 20;
    const playerHeight = 20;

    return walls.some(wall => (
        position.x < wall.x + wall.width &&
        position.x + playerWidth > wall.x &&
        position.y < wall.y + wall.height &&
        position.y + playerHeight > wall.y
    ));
}

function isWithinBounds(position) {
    const mazeWidth = maze.clientWidth;
    const mazeHeight = maze.clientHeight;
    return (
        position.x >= 0 &&
        position.x <= mazeWidth - 20 &&
        position.y >= 0 &&
        position.y <= mazeHeight - 20
    );
}

function isCollidingWithGoal(position) {
    const goalPosition = { x: 360, y: 360 }; // Goal position
    const playerWidth = 20;
    const playerHeight = 20;

    return (
        position.x < goalPosition.x + playerWidth &&
        position.x + playerWidth > goalPosition.x &&
        position.y < goalPosition.y + playerHeight &&
        position.y + playerHeight > goalPosition.y
    );
}

function resetPlayer() {
    playerPosition = { x: 10, y: 10 }; // Reset position
    updatePlayerPosition(playerPosition);
}

window.addEventListener('keydown', (event) => {
    movePlayer(event.key);
});
