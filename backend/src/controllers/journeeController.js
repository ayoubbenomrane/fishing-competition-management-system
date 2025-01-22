const journee = require('../models/journee');

module.exports = {
    // Create a new journee
    createJournee: async (req, res) => {
        try {
            const { name, date, place, duration } = req.body;
            const newJournee = await journee.create({ name, date, place, duration });
            res.status(201).json(newJournee);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create journee', details: error.message });
        }
    },

    // Get all journees
    getAllJournees: async (req, res) => {
        try {
            const journees = await journee.findAll();
            res.status(200).json(journees);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch journees', details: error.message });
        }
    },

    // Get a single journee by ID
    getJourneeById: async (req, res) => {
        try {
            const { id } = req.params;
            const singleJournee = await journee.findByPk(id);
            if (!singleJournee) {
                return res.status(404).json({ error: 'Journee not found' });
            }
            res.status(200).json(singleJournee);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch journee', details: error.message });
        }
    },

    // Update a journee by ID
    updateJournee: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, date, place, duration } = req.body;
            const journeeToUpdate = await journee.findByPk(id);
            if (!journeeToUpdate) {
                return res.status(404).json({ error: 'Journee not found' });
            }
            await journeeToUpdate.update({ name, date, place, duration });
            res.status(200).json(journeeToUpdate);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update journee', details: error.message });
        }
    },

    // Delete a journee by ID
    deleteJournee: async (req, res) => {
        try {
            const { id } = req.params;
            const journeeToDelete = await journee.findByPk(id);
            if (!journeeToDelete) {
                return res.status(404).json({ error: 'Journee not found' });
            }
            await journeeToDelete.destroy();
            res.status(200).json({ message: 'Journee deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete journee', details: error.message });
        }
    },
};
