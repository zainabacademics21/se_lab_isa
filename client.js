// Function to fetch test sentences from the Flask backend
async function fetchSentences() {
    // Fetch sentences from the backend (Flask app at http://127.0.0.1:5000/get_sentences)
    let response = await fetch("http://127.0.0.1:5000/get_sentences");
    if (response.ok) {
        // Parse the JSON response
        let sentences = await response.json();
        
        // Display sentences in the HTML by appending them to the list
        const sentencesList = document.getElementById("test-sentences");
        sentencesList.innerHTML = sentences.map(sentence => `
            <li class="review-item">
                <form action="/classify" method="POST" style="display:inline;">
                    <input type="hidden" name="sentence" value="${sentence}">
                    <button type="submit">${sentence.substring(0, 100)}...</button>
                </form>
            </li>
        `).join('');
    } else {
        // Handle errors if fetching sentences fails
        console.error("Failed to fetch sentences:", response.status);
    }
}

// Function to classify text (called when the user submits a sentence)
async function classifyText(sentence) {
    let response = await fetch("http://127.0.0.1:5000/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sentence })
    });

    if (response.ok) {
        // Display classification results
        let result = await response.json();
        document.getElementById("result").innerText = "Prediction: " + result.prediction;
    } else {
        console.error("Failed to classify text:", response.status);
    }
}

// Trigger the fetchSentences function when the page is loaded
window.onload = fetchSentences;
