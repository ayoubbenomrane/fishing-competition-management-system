const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./swagger'); // Import Swagger configuration

const journeeRoutes = require('./routes/journeeRoutes');
const joueurRoutes = require('./routes/joueurRoutes');
const recordRoutes = require('./routes/recordRoutes');

const app = express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.static('../uploads'))

// Routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use('/api/journee', journeeRoutes); // Mount journee routes
app.use('/api/joueur', joueurRoutes);   // Mount joueur routes
app.use('/api/record', recordRoutes); // Mount record routes


// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Fishing Competition API');
});
app.get('/debug-env', (req, res) => {
    res.json({
    //   NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DB_PASSWORD ? "Exists" : "Missing",
      // Add other vars
    });
  });

module.exports = app;
