let socket;

// Function to connect to the WebSocket server
function connectWebSocket() {
    socket = new WebSocket("ws://localhost:8765");

    socket.onopen = function() {
        console.log("WebSocket connection established.");
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        displayPrediction(data.prediction);
    };

    socket.onerror = function(error) {
        console.error("WebSocket error: ", error);
    };

    socket.onclose = function() {
        console.log("WebSocket connection closed.");
    };
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = {
        age: document.getElementById("age").value,
        sex: document.getElementById("sex").value,
        chest_pain: document.getElementById("chest_pain").value,
        resting_bp: document.getElementById("resting_bp").value,
        cholesterol: document.getElementById("cholesterol").value,
        fasting_bs: document.getElementById("fasting_bs").value,
        resting_ecg: document.getElementById("resting_ecg").value,
        max_hr: document.getElementById("max_hr").value,
        exercise_angina: document.getElementById("exercise_angina").value,
        oldpeak: document.getElementById("oldpeak").value,
        slope: document.getElementById("slope").value,
        vessels: document.getElementById("vessels").value,
        thal: document.getElementById("thal").value
    };

    // Send data to the server
    socket.send(JSON.stringify(formData));
}

// Connect to WebSocket when the window loads
window.onload = function() {
    connectWebSocket();
    const form = document.querySelector("form");
    form.addEventListener("submit", submitForm);
};

function displayPrediction(prediction) {
    const predictionResultDiv = document.getElementById("predictionResult");
    predictionResultDiv.textContent = "Prediction: " + prediction;
    predictionResultDiv.style.display = "block"; // Show the prediction block
}