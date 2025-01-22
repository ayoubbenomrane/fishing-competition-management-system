const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const journee = require('./journee');
const joueur = require('./joueur');

const record = sequelize.define(
    'record',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        journee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: journee, key: 'id' }
        },
        joueur_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: joueur, key: 'id' }
        },
        absent: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

        fish_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ranking: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        timestamps: false, // Disable createdAt and updatedAt
    }
);

// Define associations
journee.hasMany(record, { foreignKey: 'journee_id' });
record.belongsTo(journee, { foreignKey: 'journee_id' });

joueur.hasMany(record, { foreignKey: 'joueur_id' });
record.belongsTo(joueur, { foreignKey: 'joueur_id' });

module.exports = record;
