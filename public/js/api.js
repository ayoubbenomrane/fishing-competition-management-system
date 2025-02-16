const url = "http://localhost:3000/api/";
async function apiRequest(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            // headers: { 'Content-Type': 'application/json' },

        }
        if (body) {
            options.body = body;
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

export async function getJournees() {
    return await apiRequest('journee');

}


export async function getRecords(journee_id) {
    return await apiRequest(`record?journee_id=${journee_id}`);
}

export async function getJoueurs() {
    return await apiRequest('joueur')
}

export async function updateRecord(record_id, body) {
    return await apiRequest(`record/${record_id}`, 'PUT', body)
}

export async function addPlayer(body) {
    return await apiRequest("joueur", "POST", body)
}
export async function addJournee(body){
    return await apiRequest("journee","POST", body)
}