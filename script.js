// Example: Simple alert on form submission
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the form from refreshing the page
    alert('Thank you for reaching out! We will get back to you soon.');
});
