const canvas = document.getElementById("pixel-canvas");
const colorPicker = document.getElementById("color");
const clearButton = document.getElementById("clear-canvas");

const gridSize = 64; // Grid size: 64x64
const pixelStatesKey = "pixelCanvasState"; // Key for localStorage

// Load saved canvas state (if exists)
const savedState = JSON.parse(localStorage.getItem(pixelStatesKey)) || Array(gridSize * gridSize).fill("#fff");

// Create the grid
function createGrid() {
    canvas.innerHTML = ""; // Clear the canvas
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.backgroundColor = savedState[i]; // Set saved color

        // Add click listener to change color
        pixel.addEventListener("click", () => {
            const color = colorPicker.value;
            pixel.style.backgroundColor = color;

            // Update the saved state
            savedState[i] = color;
            saveCanvasState();
        });

        canvas.appendChild(pixel);
    }
}

// Save the canvas state to localStorage
function saveCanvasState() {
    localStorage.setItem(pixelStatesKey, JSON.stringify(savedState));
}

// Clear the canvas and reset state
clearButton.addEventListener("click", () => {
    savedState.fill("#fff");
    saveCanvasState();
    createGrid();
});

// Initialize the canvas
createGrid();
