const socket = new WebSocket('ws://localhost:8765');

socket.onopen = () => {
    console.log("Connected to the server");
};

document.getElementById("healthForm").onsubmit = async (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value; // Собираем данные из формы
    });

    // Отправляем данные на сервер
    socket.send(JSON.stringify(data));
};

socket.onmessage = (event) => {
    const response = JSON.parse(event.data);
    alert(`Prediction: ${response.prediction}\n${response.comparison}`);
};
