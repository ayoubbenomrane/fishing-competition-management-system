const app = require('./app'); // Import the app instance from app.js
const db = require('./config/db'); // Import SQLite database instance
// require('dotenv').config(); 
const path = require('path');
console.log(__dirname)
require('dotenv').config({ path: path.join(`${__dirname}/../`, '.env') });
console.log("DB URL:", process.env.DB_USER); // Test immediately

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
