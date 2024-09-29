const player = document.getElementById('player');
const maze = document.getElementById('maze');

// Player's initial position
let playerPosition = { x: 190, y: 190 };

// Define walls
const walls = [
    { x: 0, y: 0, width: 400, height: 10 },   // Top wall
    { x: 0, y: 0, width: 10, height: 400 },   // Left wall
    { x: 0, y: 390, width: 400, height: 10 }, // Bottom wall
    { x: 390, y: 0, width: 10, height: 400 }, // Right wall
    
    // Existing internal walls
    { x: 100, y: 100, width: 10, height: 200 },  // Vertical wall
    { x: 100, y: 200, width: 200, height: 10 },  // Horizontal wall
    { x: 200, y: 50, width: 10, height: 150 },   // New vertical wall
    { x: 250, y: 200, width: 10, height: 100 },  // Another vertical wall
    { x: 100, y: 300, width: 100, height: 10 },  // New horizontal wall

    // New complex walls
    { x: 150, y: 150, width: 50, height: 10 },   // Small horizontal wall
    { x: 150, y: 150, width: 10, height: 50 },   // Small vertical wall

    { x: 275, y: 50, width: 75, height: 10 },    // Upper right horizontal wall
    { x: 350, y: 50, width: 10, height: 150 },   // Upper right vertical wall

    { x: 200, y: 250, width: 75, height: 10 },   // Mid horizontal wall
    { x: 275, y: 250, width: 10, height: 50 },   // Mid vertical wall
    
    // Diagonal walls
    { x: 50, y: 50, width: 100, height: 10, rotation: 45 },  // Diagonal wall
    { x: 300, y: 300, width: 100, height: 10, rotation: -45 }, // Opposite diagonal wall
];

// Create wall elements
walls.forEach(createWall);

// Function to create wall elements
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
            newPosition.y -= 20;
            break;
        case 'ArrowDown':
            newPosition.y += 20;
            break;
        case 'ArrowLeft':
            newPosition.x -= 20;
            break;
        case 'ArrowRight':
            newPosition.x += 20;
            break;
    }

    // Check for collisions and update position
    if (!isCollidingWithWall(newPosition) && isWithinBounds(newPosition)) {
        updatePlayerPosition(newPosition);
    }

    // Check if the player reached the goal
    if (isCollidingWithGoal(newPosition)) {
        alert('Congratulations! You reached the goal!');
        resetPlayer();
    }
}

// Function to update player position
function updatePlayerPosition(position) {
    playerPosition = position;
    player.style.top = `${playerPosition.y}px`;
    player.style.left = `${playerPosition.x}px`;
}

// Function to check for wall collisions
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

// Function to check if the player is within the maze boundaries
function isWithinBounds(position) {
    return (
        position.x >= 0 &&
        position.x <= maze.clientWidth - 20 &&
        position.y >= 0 &&
        position.y <= maze.clientHeight - 20
    );
}

// Function to check for goal collision
function isCollidingWithGoal(position) {
    const goalPosition = { x: 360, y: 360 }; // Position of the goal
    const playerWidth = 20;
    const playerHeight = 20;

    return (
        position.x < goalPosition.x + playerWidth &&
        position.x + playerWidth > goalPosition.x &&
        position.y < goalPosition.y + playerHeight &&
        position.y + playerHeight > goalPosition.y
    );
}

// Function to reset player position
function resetPlayer() {
    playerPosition = { x: 190, y: 190 }; // Reset to the middle
    updatePlayerPosition(playerPosition);
}

// Event listener for keydown events
window.addEventListener('keydown', (event) => {
    movePlayer(event.key);
});
