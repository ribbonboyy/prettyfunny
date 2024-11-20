// Select all elements with the class "bendable"
document.querySelectorAll('.bendable').forEach(item => {
    // Add mousemove listener
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left; // Cursor X within the element
        const y = e.clientY - rect.top;  // Cursor Y within the element

        const centerX = rect.width / 2; // Center X of the element
        const centerY = rect.height / 2; // Center Y of the element

        const rotateX = ((y - centerY) / centerY) * 10; // Sensitivity multiplier
        const rotateY = ((x - centerX) / centerX) * -10;

        // Apply rotation transform
        item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset transform on mouse leave
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});
