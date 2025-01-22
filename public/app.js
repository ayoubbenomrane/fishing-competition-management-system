const API_BASE = "http://localhost:3000/api/"; // Backend API base URL


// Fetch and display all Journées
async function fetchJournées() {
    const response = await fetch(`${API_BASE}journee`);
    const journées = await response.json();

    const journeeList = document.getElementById("journee-list");
    journeeList.innerHTML = ""; // Clear previous list

    journées.forEach((journee) => {
        const div = document.createElement("div");
        div.classList.add("mt-4");

        div.innerHTML = `
            <h4>${journee.name}</h4>
            <p><strong>Date:</strong> ${journee.date || "No Date"} | <strong>Place:</strong> ${journee.place}</p>
            <table class="table table-striped table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Player</th>
                        <th>Number of Fish</th>
                        <th>Total Weight (kg)</th>
                        <th>Ranking</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Dynamic Player Records for this Journée -->
                    <!-- Add logic for player records here -->
                </tbody>
            </table>
        `;
        journeeList.appendChild(div);
    });
}

// Handle adding a new Journée
document.getElementById("add-journee-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("journee-name").value;
    const date = document.getElementById("journee-date").value;
    const place = document.getElementById("journee-place").value;

    // Send POST request to backend
    await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date, place }),
    });

    // Close the modal
    $('#addJourneeModal').modal('hide');

    // Refresh the list of Journées
    fetchJournées();
});

// Initial Fetch
fetchJournées();
