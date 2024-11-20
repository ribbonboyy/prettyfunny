// Add event listeners to all elements with the "bendable" class
document.querySelectorAll('.bendable').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X position relative to element
        const y = e.clientY - rect.top;  // Mouse Y position relative to element

        const centerX = rect.width / 2; // Center X of the element
        const centerY = rect.height / 2; // Center Y of the element

        const rotateX = ((y - centerY) / centerY) * 10; // Adjust tilt sensitivity
        const rotateY = ((x - centerX) / centerX) * -10;

        // Update the transform of the ::before pseudo-element
        item.style.setProperty('--rotateX', `${rotateX}deg`);
        item.style.setProperty('--rotateY', `${rotateY}deg`);
    });

    // Reset the bending effect on mouse leave
    item.addEventListener('mouseleave', () => {
        item.style.setProperty('--rotateX', `0deg`);
        item.style.setProperty('--rotateY', `0deg`);
    });
});
