getAllRecordsQuery= `
    SELECT 
        j.name as joueur_name,
        r.fish_count,
        r.total_weight,
        r.score,
        r.ranking
    FROM records r 
    INNER JOIN joueurs j
    ON r.joueur_id=j.id
    WHERE ( $1 IS NULL OR r.journee_id=$1)
    ORDER BY r.ranking ASC
`



module.exports= {getAllRecordsQuery}