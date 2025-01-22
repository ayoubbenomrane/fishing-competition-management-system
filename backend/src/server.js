const app = require('./app'); // Import the app instance from app.js
const { sequelize } = require('./models'); // Import Sequelize instance

const PORT = process.env.PORT || 3000;

// Sync the database and start the server
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Sync the models to the database
        console.log('Database synced successfully');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();
