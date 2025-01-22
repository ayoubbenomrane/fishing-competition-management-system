const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite', // Use SQLite
    storage: './database.sqlite', // Path and name of the database file
    logging: false, // Disable logging for cleaner output
});

// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
