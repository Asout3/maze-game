const player = document.getElementById('player');
const maze = document.getElementById('maze');

// Player's initial position
let playerPosition = { x: 10, y: 10 };

// Set the player's initial position
player.style.left = `${playerPosition.x}px`;
player.style.top = `${playerPosition.y}px`;

// Define the hardest maze walls
const walls = [
    // Outer walls
    { x: 0, y: 0, width: 400, height: 10 },   // Top wall
    { x: 0, y: 0, width: 10, height: 400 },   // Left wall
    { x: 0, y: 390, width: 400, height: 10 }, // Bottom wall
    { x: 390, y: 0, width: 10, height: 400 }, // Right wall

    // Complex interior walls
    { x: 30, y: 30, width: 10, height: 100 },  // Vertical wall
    { x: 30, y: 30, width: 150, height: 10 },  // Top horizontal wall
    { x: 180, y: 30, width: 10, height: 70 },   // Vertical wall
    { x: 30, y: 130, width: 100, height: 10 },  // Second horizontal wall

    { x: 30, y: 150, width: 10, height: 150 },  // Left vertical wall
    { x: 70, y: 150, width: 10, height: 50 },   // Vertical wall
    { x: 70, y: 200, width: 100, height: 10 },  // Middle horizontal wall
    { x: 70, y: 250, width: 10, height: 100 },  // Vertical wall

    { x: 100, y: 300, width: 150, height: 10 }, // Horizontal wall blocking access
    { x: 250, y: 300, width: 10, height: 100 }, // Right vertical wall

    // Creating a labyrinthine section
    { x: 200, y: 10, width: 10, height: 200 },  // Right vertical wall
    { x: 250, y: 10, width: 10, height: 200 },  // Another vertical wall
    { x: 200, y: 150, width: 100, height: 10 }, // Top horizontal wall blocking access
    { x: 300, y: 60, width: 10, height: 200 },  // Vertical wall creating paths

    // Narrow passages
    { x: 120, y: 40, width: 30, height: 10 },   // Narrow horizontal
    { x: 130, y: 40, width: 10, height: 40 },   // Vertical
    { x: 200, y: 250, width: 100, height: 10 }, // Lower horizontal wall

    // Final path to the goal
    { x: 350, y: 370, width: 10, height: 30 },  // Pathway to goal
    { x: 280, y: 360, width: 70, height: 10 },  // Wider horizontal wall at goal
    { x: 280, y: 390, width: 20, height: 10 },   // Goal area opening
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
    const goalPosition = { x: 280, y: 360 }; // Goal position
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
