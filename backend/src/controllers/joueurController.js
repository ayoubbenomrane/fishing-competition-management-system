const joueur = require('../models/joueur');

module.exports = {
    // Create a new joueur
    createJoueur: async (req, res) => {
        try {
            const { name, phone_number } = req.body;
            const newJoueur = await joueur.create({ name, phone_number });
            res.status(201).json(newJoueur);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create joueur', details: error.message });
        }
    },

    // Get all joueurs
    getAllJoueurs: async (req, res) => {
        try {
            const joueurs = await joueur.findAll();
            res.status(200).json(joueurs);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch joueurs', details: error.message });
        }
    },

    // Get a single joueur by ID
    getJoueurById: async (req, res) => {
        try {
            const { id } = req.params;
            const singleJoueur = await joueur.findByPk(id);
            if (!singleJoueur) {
                return res.status(404).json({ error: 'Joueur not found' });
            }
            res.status(200).json(singleJoueur);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch joueur', details: error.message });
        }
    },

    // Update a joueur by ID
    updateJoueur: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, phone_number } = req.body;
            const joueurToUpdate = await joueur.findByPk(id);
            if (!joueurToUpdate) {
                return res.status(404).json({ error: 'Joueur not found' });
            }
            await joueurToUpdate.update({ name, phone_number });
            res.status(200).json(joueurToUpdate);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update joueur', details: error.message });
        }
    },

    // Delete a joueur by ID
    deleteJoueur: async (req, res) => {
        try {
            const { id } = req.params;
            const joueurToDelete = await joueur.findByPk(id);
            if (!joueurToDelete) {
                return res.status(404).json({ error: 'Joueur not found' });
            }
            await joueurToDelete.destroy();
            res.status(200).json({ message: 'Joueur deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete joueur', details: error.message });
        }
    },
};
