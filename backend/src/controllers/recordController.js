const db = require('../config/db');

async function createRecord(req , res){
    const {journee_id,joueur_id,fish_count=0,total_weight=0,absent}=req.body;
    const query= `INSERT INTO record (journee_id,joueur_id, fish_count ,total_weight,absent) VALUES ($1, $2, $3, $4, $5)`;
    try{
        const result= await db.query(query,[journee_id,joueur_id,fish_count,total_weight,absent]);
        res.status(201).json({message:"Record created successfully",data:result.rows[0]}); 
    }
    catch(err){
        res.status(500).json({message:"error creating record",details:err.message})
    }

}
async function getAllRecords(req,res){
    const {journee_id}=req.query;

    const query= journee_id ? `SELECT *,(fish_count*50+total_weight) AS score  FROM record where journee_id=$1 ORDER BY score DESC` : `SELECT *,(fish_count*50+total_weight) AS score  FROM record  ORDER BY score DESC` 
    try{
        const result =await db.query(query,journee_id ? [journee_id]: []);
       
        res.status(201).json(result.rows);
    }
    catch(err){
        res.status(500).json({message:"error fetching records",details:err.message})
    }
}

async function updateRecord(req,res){
    const {id}=req.params;
    const updates=req.body;
    const fields= Object.keys(updates).map((key,index)=>{`${key} = $${index+1}`}).join(",");
    const values=Object.values(updates);
    values.push(id);
    const query= `UPDATE record SET ${fields} WHERE id==${values.length}  RETURNING *`;
    try {
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.status(200).json({ message: 'Record updated successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update record', details: err.message });
    }
}

async function deleteRecord(req,res){
    const {id}=req.params;
    const query= `DELETE * FROM record WHERE id=${1}`;
    try{
        const result= await db.query(query,[id]);
        return res.status(200).json({message:"Recode successfully deleted"});
    }
    catch(err){
        res.status(500).json({ error: 'Failed to delete record', details: err.message });

    }

}



module.exports={getAllRecords,createRecord,updateRecord,deleteRecord}