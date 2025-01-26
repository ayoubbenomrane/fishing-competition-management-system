const app = require('./app'); // Import the app instance from app.js
const db = require('./config/db').db; // Import SQLite database instance

const PORT = process.env.PORT || 3000;

// Start the server



(async () => {
    try {
        // Verify database connection
        db.get('SELECT * FROM joueur', (err) => {
            if (err) {
                console.error('Error connecting to the database:', err.message);
                process.exit(1); // Exit if the database connection fails
            } else {
                console.log('Database connected successfully');
            }
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing the server:', error.message);
        process.exit(1); // Exit if there’s an error starting the server
    }
})();
