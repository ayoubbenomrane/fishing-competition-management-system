const db = require('../config/db').db;

module.exports = {
    // Create a new joueur
    createJoueur: (req, res) => {
        const { name, phone_number } = req.body;
        const query = `INSERT INTO joueur (name, phone_number) VALUES (?, ?)`;

        db.run(query, [name, phone_number], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create joueur', details: err.message });
            }
            res.status(201).json({ id: this.lastID, name, phone_number });
        });
    },

    // Get all joueurs
    getAllJoueurs: (req, res) => {
        const query = `SELECT * FROM joueur`;
        

        db.all(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch joueurs', details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Get a single joueur by ID
    getJoueurById: (req, res) => {
        const { id } = req.params;
        const query = `SELECT * FROM joueur WHERE id = ?`;

        db.get(query, [id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch joueur', details: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: 'Joueur not found' });
            }
            res.status(200).json(row);
        });
    },

    // Update a joueur by ID
    updateJoueur: (req, res) => {
        const { id } = req.params;
        const { name, phone_number } = req.body;
        const query = `UPDATE joueur SET name = ?, phone_number = ? WHERE id = ?`;

        db.run(query, [name, phone_number, id], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update joueur', details: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Joueur not found' });
            }
            res.status(200).json({ id, name, phone_number });
        });
    },

    // Delete a joueur by ID
    deleteJoueur: (req, res) => {
        const { id } = req.params;
        const query = `DELETE FROM joueur WHERE id = ?`;

        db.run(query, [id], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete joueur', details: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Joueur not found' });
            }
            res.status(200).json({ message: 'Joueur deleted successfully' });
        });
    },
};
