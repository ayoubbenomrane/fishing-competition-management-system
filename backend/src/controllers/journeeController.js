const db = require('../config/db'); // Ensure this exports a PostgreSQL pool

// Create a new journee
async function createJournee(req, res) {
    const { name = 'Journee X', date = new Date(), place = 'Tunisia', duration = '05:00:00' } = req.body;

    const query = `
        INSERT INTO journee (name, date, place, duration)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    try {
        await db.query("BEGIN");

        const result = (await db.query(query, [name, date, place, duration])).rows[0];
        const getJoueurQuery= "SELECT id FROM joueur";
        const joueurs=await (await db.query(getJoueurQuery)).rows;
        const recordQuery=`INSERT INTO record (journee_id,joueur_id,fish_count,total_weight,absent) VALUES${joueurs.map((joueurs,index)=>` ($${index*5+1} ,$${index*5+2} ,$${index*5+3} ,$${index*5+4} ,$${index*5+5})`)} `;
        const values=joueurs.flatMap(joueur=>[result.id,joueur.id,0,0,0])
        console.log(recordQuery,values)
        await db.query(recordQuery,values);
        await db.query("COMMIT");
        res.status(201).json({ message: 'Journee created successfully', data: result});
    } catch (err) {
        await db.query("ROLLBACK")
        res.status(500).json({ error: 'Failed to create journee', details: err.message });
    }
}

// Get all journees
async function getAllJournees(req, res) {
    const query = `SELECT * FROM journee`;

    try {
        const result = await db.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch journees', details: err.message });
    }
}

// Get a single journee by ID
async function getJourneeById(req, res) {
    const { id } = req.params;
    const query = `SELECT * FROM journee WHERE id = $1`;

    try {
        const result = await db.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Journee not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch journee', details: err.message });
    }
}

// Update a journee by ID
async function updateJournee(req, res) {
    const { id } = req.params;
    const body = req.body;
    let counter=1;
    let query='';
    const values=[]
    console.log(body)
    for(const [key,value] of Object.entries(body)){
        query+=`${key}=$${counter++} ,`;
        values.push(value);
    }
    console.log(query);
    query=query.slice(0,-1);
    query=`UPDATE journee SET ${query} WHERE id=$${counter} returning *`;
    console.log(query)
    values.push(id);
    console.log(values)

    try {
        const result = await db.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Journee not found' });
        }
        res.status(200).json({ message: 'Journee updated successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update journee', details: err.message });
    }
}

// Delete a journee by ID
async function deleteJournee(req, res) {
    const { id } = req.params;
    const query = `DELETE FROM journee WHERE id = $1 RETURNING *;`;

    try {
        const result = await db.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Journee not found' });
        }
        res.status(200).json({ message: 'Journee deleted successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete journee', details: err.message });
    }
}

module.exports={createJournee,getAllJournees,getJourneeById,updateJournee,deleteJournee}