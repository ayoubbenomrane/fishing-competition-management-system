const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./swagger'); // Import Swagger configuration

const journeeRoutes = require('./routes/journeeRoutes');
const joueurRoutes = require('./routes/joueurRoutes');
const recordRoutes = require('./routes/recordRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); 

// Routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use('/api/journee', journeeRoutes); // Mount journee routes
app.use('/api/joueur', joueurRoutes);   // Mount joueur routes
app.use('/api/record', recordRoutes); // Mount record routes


// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Fishing Competition API');
});

module.exports = app;
