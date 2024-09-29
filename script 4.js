const player = document.getElementById('player');
const maze = document.getElementById('maze');

// Player's initial position
let playerPosition = { x: 10, y: 10 }; // Set initial position coordinates here

// Ensure the player's initial position is correctly set
player.style.left = `${playerPosition.x}px`;
player.style.top = `${playerPosition.y}px`;

// Define complex walls for the maze
const walls = [
    { x: 0, y: 0, width: 400, height: 10 },    // Top wall
    { x: 0, y: 0, width: 10, height: 400 },    // Left wall
    { x: 0, y: 390, width: 400, height: 10 },  // Bottom wall
    { x: 390, y: 0, width: 10, height: 400 },  // Right wall

    { x: 30, y: 30, width: 300, height: 10 },  // First horizontal wall
    { x: 30, y: 60, width: 10, height: 300 },  // Vertical wall

    { x: 30, y: 200, width: 100, height: 10 }, // Horizontal wall

    { x: 140, y: 60, width: 10, height: 100 }, // Vertical wall

    { x: 140, y: 160, width: 50, height: 10 }, // Horizontal wall
    { x: 180, y: 160, width: 10, height: 100 }, // Vertical wall

    { x: 80, y: 280, width: 200, height: 10 }, // Large horizontal
    { x: 80, y: 280, width: 10, height: 50 },  // Vertical wall

    { x: 200, y: 100, width: 100, height: 10 }, // Horizontal wall
    { x: 300, y: 100, width: 10, height: 150 }, // Vertical wall

    { x: 200, y: 250, width: 100, height: 10 }, // Horizontal wall
    { x: 250, y: 250, width: 10, height: 50 },  // Vertical wall

    { x: 60, y: 350, width: 200, height: 10 },  // Bottom wall
    { x: 150, y: 300, width: 10, height: 50 },  // Vertical wall

    { x: 300, y: 200, width: 50, height: 10 },  // Diagonal
    { x: 270, y: 150, width: 50, height: 10 },  // Diagonal

    { x: 100, y: 50, width: 50, height: 10 },  // Horizontal near start
    { x: 200, y: 300, width: 50, height: 10 }, // Horizontal near goal

    { x: 250, y: 100, width: 10, height: 50 }, // Blocker wall
    { x: 300, y: 200, width: 10, height: 50 }  // Final wall
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
