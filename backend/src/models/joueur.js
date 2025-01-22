const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const joueur = sequelize.define('joueur',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        phone_number: { type: DataTypes.STRING, allowNull: true },
        total_score: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
        final_ranking: { type: DataTypes.INTEGER, allowNull: true },

    },
    {
        timestamps: false, // Disable createdAt and updatedAt
    });

module.exports = joueur;
