    const url = "https://fathomless-garden-14159-487a779b2d94.herokuapp.com/";
    async function apiRequest(endpoint, method = 'GET', body = null, contentType=null) {
        try {
            const options = {
                method,
                
                // headers: { 'Content-Type': 'application/json' },

            }
            if(body){
                options.body=body
            }
            if(contentType=='json'){

                options.headers={'Content-Type':'application/json'};
                if (body) {
                    options.body = JSON.stringify(body);
                }
            }
            
        
        
            const response = await fetch(`${url}${endpoint}`, options);
            if (!response.ok) {
                const errorDetails = await response.text();  // Get response body for debugging
                console.error('API request failed:', errorDetails);
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
            };
            return await response.json();

        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    // ---------journeee-------

    export async function getJournees() {
        return await apiRequest('journee');

    }

    export async function addJournee(body){
        return await apiRequest("journee","POST", body,"json")
    }
    export async function updateJournee(id,body){
        return await apiRequest(`journee/${id}`,"PUT",body,"json");
    }
    export async function deleteJournee(id){
        return await apiRequest(`journee/${id}`,"DELETE")
    }

// --------records-------

export async function getRecords(journee_id) {
    return await apiRequest(`record?journee_id=${journee_id}`);
}

export async function updateRecord(record_id, body) {
    return await apiRequest(`record/${record_id}`, 'PUT', body,'json')
}

// -----------players---------

export async function getJoueurs() {
    return await apiRequest('joueur')
}


export async function updatePlayer(playerId,body){
    return await apiRequest(`joueur/${playerId}`,"PUT",body)
}

export async function addPlayer(body) {
    return await apiRequest("joueur", "POST", body)
}
export async function deletePlayer(id){
    return await apiRequest(`joueur/${id}`,"DELETE")
}
