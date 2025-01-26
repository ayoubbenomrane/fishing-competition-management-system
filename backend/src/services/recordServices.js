const { sequelize } = require('../config/db');
const queries = require('../queries/recordQueries');

async function getAllRecords(journee_id = null) {
  try {
    console.log('Service test: Executing query');

    const [rows] = await sequelize.query(queries.getAllRecordsQuery, {
      replacements: { journee_id }, // Named parameter replacement (if needed)
    });

    console.log('Records fetched successfully:', rows);
    return rows;
  } catch (error) {
    console.error('Error fetching records:', error.message);
    throw error; // Pass the error to the controller for handling
  }
}

module.exports = { getAllRecords };
