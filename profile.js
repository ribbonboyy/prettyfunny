// Select all elements with the "bendable" class
const bendableElements = document.querySelectorAll('.bendable');

bendableElements.forEach(item => {
    // Add mousemove listener to create the bending effect
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X position relative to element
        const y = e.clientY - rect.top;  // Mouse Y position relative to element

        const centerX = rect.width / 2; // Center X of the element
        const centerY = rect.height / 2; // Center Y of the element

        // Calculate rotation angles
        const rotateX = ((y - centerY) / centerY) * 10; // Sensitivity factor
        const rotateY = ((x - centerX) / centerX) * -10;

        // Apply the transformation
        item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset the transform when the mouse leaves the element
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});
