const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const dbPath = './db.db'; // Path to your SQLite database file
const path = require('path');
console.log('Using SQLite database at:', path.resolve(dbPath));
// Check if the database file exists
if (!fs.existsSync(dbPath)) {
    console.error(`Database file not found at: ${dbPath}`);
    process.exit(1); // Exit the application if the file doesn't exist
}

// Initialize the database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the SQLite database:', err.message);
        process.exit(1); // Exit the application if the connection fails
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = { db };
