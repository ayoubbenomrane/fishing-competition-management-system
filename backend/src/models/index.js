const sequelize = require('../config/db');
const journee = require('./journee');
const joueur = require('./joueur');
const record = require('./record');

module.exports = {
    sequelize,
    journee,
    joueur,
    record,
};
