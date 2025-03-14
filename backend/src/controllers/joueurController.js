const db = require('../config/db'); // Ensure this exports a PostgreSQL pool

// Create a new joueur
async function createJoueur(req, res) {
    const { name, phone_number,birthdate } = req.body;
    console.log(req.body)
    const query = `
        INSERT INTO joueur (name,birthdate,profile_picture, phone_number)
        VALUES ($1, $2,$3,$4)
        RETURNING *;
    `;

    try {
        await db.query("BEGIN");
        console.log(req.file)
        const result = await db.query(query, [name,birthdate,req.file.filename, phone_number]);
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
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch joueur', details: error.message });
    }
}

// Update a joueur by ID
async function updateJoueur(req, res) {
    const {id}=req.params;
    const body=req.body;
    let query='';
    const values=[];
    let index=1;
    console.log(body)
    for(const [key,value] of Object.entries(body)){
        query+=`${key}=$${index++} ,`;
        values.push(value);
    }
    if(req.file){
        query+= `profile_picture= $${index++} ,` ;
        values.push(req.file.filename);

    }
    values.push(id);
    console.log(query)
    query=query.slice(0,-1);
    query= `UPDATE joueur SET ${query} WHERE id=$${index++}`;
    console.log(query)
    try{
        await db.query("BEGIN");
        await db.query(query,values)
        await db.query("COMMIT")
        res.status(201).json({message:'player updated successfully'})
    }
    catch(error){
        res.status(500).json({ error: 'Failed to update joueur', details: error.message });

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