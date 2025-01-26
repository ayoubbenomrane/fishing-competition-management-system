const db = require('../config/db').db;

module.exports = {
    // Create a new record
    createRecord: (req, res) => {
        const { journee_id, joueur_id, fish_count, total_weight, absent } = req.body;

        // Calculate score
        const score = absent ? -20 : fish_count * 50 + total_weight;
        // console.log(score)
        // Insert the new record
        const query = `
            INSERT INTO record (journee_id, joueur_id, fish_count, total_weight, score, absent)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(query, [journee_id, joueur_id, fish_count, total_weight, score, absent], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create record', details: err.message });
            }

             res.status(201).json({ message: 'Record created successfully'})
           
        });
    },

    // Get all records sorted by score
    getAllRecords: (req, res) => {
        const { journee_id } = req.query;

        const query = journee_id
            ? `SELECT * FROM record WHERE journee_id = ? ORDER BY score DESC`
            : `SELECT * FROM record ORDER BY score DESC`;

        db.all(query, journee_id ? [journee_id] : [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch records', details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Get a single record by ID
    getRecordById: (req, res) => {
        const { id } = req.params;
        const query = `
            SELECT record.*, joueur.name AS joueur_name, journee.name AS journee_name
            FROM record
            JOIN joueur ON record.joueur_id = joueur.id
            JOIN journee ON record.journee_id = journee.id
            WHERE record.id = ?
        `;

        db.get(query, [id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch record', details: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: 'Record not found' });
            }
            res.status(200).json(row);
        });
    },

    // Update a record by ID
    updateRecord: (req, res) => {
        const { id } = req.params;
        const { fish_count, total_weight, score, ranking } = req.body;

        const query = `
            UPDATE record
            SET fish_count = ?, total_weight = ?, score = ?, ranking = ?
            WHERE id = ?
        `;

        db.run(query, [fish_count, total_weight, score, ranking, id], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update record', details: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Record not found' });
            }
            res.status(200).json({ id, fish_count, total_weight, score, ranking });
        });
    },

    // Delete a record by ID
    deleteRecord: (req, res) => {
        const { id } = req.params;
        const query = `DELETE FROM record WHERE id = ?`;

        db.run(query, [id], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete record', details: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Record not found' });
            }
            res.status(200).json({ message: 'Record deleted successfully' });
        });
    },
};
