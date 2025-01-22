const record = require('../models/record');
const journee = require('../models/journee');
const joueur = require('../models/joueur');

module.exports = {
    // Create a new record
    createRecord: async (req, res) => {
        try {
            const { journee_id, joueur_id, fish_count, total_weight,absent } = req.body;
        
            // Determine if the player is absent

            // Calculate score
            const score = absent ? -20 : fish_count * 50 + total_weight;

            // Create the new record
            const newRecord = await record.create({
                journee_id,
                joueur_id,
                fish_count,
                total_weight,
                score,
                absent,
            });

            // Update player's total_score
            const player = await joueur.findByPk(joueur_id);
            player.total_score += score; // Update total score
            await player.save();

            // Recalculate daily rankings for the journée
            const allRecords = await record.findAll({
                where: { journee_id }, // Only records for the current journée
                order: [['score', 'DESC']], // Sort by score (highest first)
            });

            // Update rankings for all records in the journée
            for (let i = 0; i < allRecords.length; i++) {
                await allRecords[i].update({ ranking: i + 1 });
            }

            res.status(201).json(newRecord);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create record', details: error.message });
        }
    },


    // Get all records sorted by score
    getAllRecords: async(req,res)=>{
        try{}
        catch(error){
            res.satus(500).json({error:'failed o fetch recod',details:error.message})
        }
    },
    // Get a single record by ID
    getRecordById: async (req, res) => {
        try {
            const { id } = req.params;
            const singleRecord = await record.findByPk(id, {
                include: [journee, joueur], // Include associated journee and joueur
            });
            if (!singleRecord) {
                return res.status(404).json({ error: 'Record not found' });
            }
            res.status(200).json(singleRecord);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch record', details: error.message });
        }
    },

    // Update a record by ID
    updateRecord: async (req, res) => {
        try {
            const { id } = req.params;
            const { fish_count, total_weight, score, ranking } = req.body;
            const recordToUpdate = await record.findByPk(id);
            if (!recordToUpdate) {
                return res.status(404).json({ error: 'Record not found' });
            }
            await recordToUpdate.update({ fish_count, total_weight, score, ranking });
            res.status(200).json(recordToUpdate);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update record', details: error.message });
        }
    },

    // Delete a record by ID
    deleteRecord: async (req, res) => {
        try {
            const { id } = req.params;
            const recordToDelete = await record.findByPk(id);
            if (!recordToDelete) {
                return res.status(404).json({ error: 'Record not found' });
            }
            await recordToDelete.destroy();
            res.status(200).json({ message: 'Record deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete record', details: error.message });
        }
    },
};
