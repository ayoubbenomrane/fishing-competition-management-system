const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fishing Competition API',
            version: '1.0.0',
            description: 'API documentation for the Fishing Competition Management System',
            contact: {
                name: 'Ben Omrane Mohamed Ayoub',
                email: 'ayoubbomrane@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api', // Base URL of your API
                description: 'Development Server',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to your route files
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
