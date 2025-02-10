const app = require('./app'); // Import the app instance from app.js
const db = require('./config/db'); // Import SQLite database instance

const PORT = process.env.PORT || 3000;

// Start the server



(async () => {
    try {
       

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing the server:', error.message);
        process.exit(1); // Exit if there’s an error starting the server
    }
})();
