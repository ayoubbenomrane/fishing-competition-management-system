const url = "http://localhost:3000/api/";
async function apiRequest(endpoint,method='GET',body=null){
    try{
        const options={
            method,
            headers:{'Content-Type':'application/json'},

        }
        if(body){
            options.body=JSON.stringify(body);
        }
        const response= await fetch(`${url}${endpoint}`,options);
        if(!response.ok) throw new Error(response.status);
        return await response.json();

    }
    catch(error){
        console.error(error);
        throw error;
    }
}

export async function getJournees() {
    return await apiRequest('journee');
    
}


export async function getRecords(journee_id){
    return await apiRequest(`record?journee_id=${journee_id}`);
}

export async function getJoueurs(){
    return await apiRequest('joueur')
}

export async function updateRecord(record_id,body){
    return await apiRequest(`record/${record_id}`,'PUT',body)
}