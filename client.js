// Fetch test sentences from Flask (which retrieves them from Firebase)
async function fetchSentences() {
    let response = await fetch("http://127.0.0.1:5000/get_sentences");  // Flask API endpoint
    let sentences = await response.json();  

    let sentenceList = document.getElementById("test-sentences");
    sentenceList.innerHTML = ""; // Clear previous entries

    sentences.forEach(sentence => {
        let form = document.createElement("form");
        form.action = "/classify";
        form.method = "POST";
        form.style.display = "inline";

        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "sentence";
        input.value = sentence;

        let button = document.createElement("button");
        button.type = "submit";
        button.textContent = sentence.length > 100 ? sentence.substring(0, 100) + "..." : sentence;

        form.appendChild(input);
        form.appendChild(button);
        sentenceList.appendChild(form);
    });
}

// Send user input to Flask for classification
async function classifyText() {
    let text = document.getElementById("user-input").value;

    let response = await fetch("http://127.0.0.1:5000/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    let result = await response.json();
    document.getElementById("result").innerText = "Prediction: " + result.prediction;
}

// Fetch sentences when the page loads
window.onload = fetchSentences;
