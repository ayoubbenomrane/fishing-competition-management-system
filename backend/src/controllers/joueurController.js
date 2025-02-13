const db = require('../config/db'); // Ensure this exports a PostgreSQL pool

// Create a new joueur
async function createJoueur(req, res) {
    const { name, phone_number } = req.body;

    const query = `
        INSERT INTO joueur (name, phone_number)
        VALUES ($1, $2)
        RETURNING *;
    `;

    try {
        await db.query("BEGIN");
        const result = await db.query(query, [name, phone_number]);
        const new_player=result.rows[0];
        const getJourneesQuery="SELECT id FROM journee";
        const journees=(await db.query(getJourneesQuery)).rows;
        if(journees.length==0) {
            await db.query("COMMIT")
        }
        else{
        const addRecordsQuery= `INSERT INTO record (journee_id,joueur_id,fish_count,total_weight,absent) VALUES ${journees.map((_,index)=>`($${index*5+1} , $${index*5+2} , $${index*5+3} , $${index*5+4} , $${index*5+5})`).join(",")} `  ;
        const values= journees.flatMap(journee=>[journee.id,new_player.id,0,0,0]);
        await db.query(addRecordsQuery,values);
        await db.query("COMMIT");}
        res.status(201).json({ message: 'Joueur created successfully', data: result.rows[0] });
    } catch (err) {
        await db.query("ROLLBACK");
        res.status(500).json({ error: 'Failed to create joueur', details: err.message });
    }
}

// Get all joueurs
async function getAllJoueurs(req, res) {
    const query = `SELECT * FROM joueur`;

    try {

        const result = await db.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch joueurs', details: err.message });
    }
}

// Get a single joueur by ID
async function getJoueurById(req, res) {
    const { id } = req.params;
    const query = `SELECT * FROM joueur WHERE id = $1`;

    try {
        const result = await db.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Joueur not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch joueur', details: err.message });
    }
}

// Update a joueur by ID
async function updateJoueur(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const query = `
        UPDATE joueur
        SET name = $1
        WHERE id = $2
        RETURNING *;
    `;

    try {
        const result = await db.query(query, [name, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Joueur not found' });
        }
        res.status(200).json({ message: 'Joueur updated successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update joueur', details: err.message });
    }
}

// Delete a joueur by ID
async function deleteJoueur(req, res) {
    const { id } = req.params;
    const query = `DELETE FROM joueur WHERE id = $1 RETURNING *;`;

    try {
        const result = await db.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Joueur not found' });
        }
        res.status(200).json({ message: 'Joueur deleted successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete joueur', details: err.message });
    }
}

module.exports={createJoueur,deleteJoueur,updateJoueur,getAllJoueurs,getJoueurById}