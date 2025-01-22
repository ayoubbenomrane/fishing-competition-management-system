const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const journee = sequelize.define('journee',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: {
            type: DataTypes.STRING,
            allowNull: true, // Allow null for flexibility
            defaultValue: 'Journee X' // Default value
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW // Defaults to the current timestamp
        },
        place: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Tunisia' // Default value
        },
        duration: {
            type: DataTypes.TIME,
            allowNull: true,
            defaultValue: '5:00:00' // Default duration
        },
    },
    {
        timestamps: false, // Disable createdAt and updatedAt
    }
);

module.exports = journee;
