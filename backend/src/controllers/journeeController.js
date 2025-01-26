const db = require('../config/db').db;

module.exports = {
    // Create a new journee
    createJournee: (req, res) => {
        const { name = 'Journee X', date = new Date(), place = 'Tunisia', duration = '05:00:00' } = req.body;
        const query = `
            INSERT INTO journee (name, date, place, duration)
            VALUES (?, ?, ?, ?)
        `;

        db.run(query, [name, date, place, duration], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create journee', details: err.message });
            }
            res.status(201).json({ id: this.lastID, name, date, place, duration });
        });
    },

    // Get all journees
    getAllJournees: (req, res) => {
        const query = `SELECT * FROM journee`;

        db.all(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch journees', details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Get a single journee by ID
    getJourneeById: (req, res) => {
        const { id } = req.params;
        const query = `SELECT * FROM journee WHERE id = ?`;

        db.get(query, [id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch journee', details: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: 'Journee not found' });
            }
            res.status(200).json(row);
        });
    },

    // Update a journee by ID
    updateJournee: (req, res) => {
        const { id } = req.params;
        const { name, date, place, duration } = req.body;
        const query = `
            UPDATE journee
            SET name = ?, date = ?, place = ?, duration = ?
            WHERE id = ?
        `;

        db.run(query, [name, date, place, duration, id], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update journee', details: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Journee not found' });
            }
            res.status(200).json({ id, name, date, place, duration });
        });
    },

    // Delete a journee by ID
    deleteJournee: (req, res) => {
        const { id } = req.params;
        const query = `DELETE FROM journee WHERE id = ?`;

        db.run(query, [id], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete journee', details: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Journee not found' });
            }
            res.status(200).json({ message: 'Journee deleted successfully' });
        });
    },
};
