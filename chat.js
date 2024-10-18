let currentChatId = null;

// Загрузка сохраненных чатов из localStorage
function loadChats() {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    const chatList = document.getElementById('saved-chats');
    chatList.innerHTML = ''; // Очистка списка чатов

    savedChats.forEach((chat, index) => {
        const chatItem = document.createElement('li');
        chatItem.textContent = `Чат ${index + 1}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.onclick = () => deleteChat(index);
        chatItem.appendChild(deleteBtn);
        chatItem.onclick = () => loadChat(index); // Загрузка чата при нажатии
        chatList.appendChild(chatItem);
    });
}

// Создание нового чата
function createNewChat() {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    const newChat = { messages: [] };
    savedChats.push(newChat);
    localStorage.setItem('chats', JSON.stringify(savedChats));
    loadChats();
    loadChat(savedChats.length - 1); // Загрузка нового чата

    // Показываем изображение при создании нового чата
    const chatImage = document.getElementById('chat-image');
    chatImage.style.display = 'block';
}

// Загрузка сообщений выбранного чата
function loadChat(index) {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = ''; // Очистка сообщений
    currentChatId = index;

    const selectedChat = savedChats[index];
    selectedChat.messages.forEach((message) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = message.text;
        chatMessages.appendChild(messageDiv);
    });

    chatMessages.style.display = 'block'; // Показать блок сообщений
    chatMessages.scrollTop = chatMessages.scrollHeight; // Прокрутка вниз
}

// Отправка сообщения и сохранение его в текущий чат
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatImage = document.getElementById('chat-image'); // Получаем элемент с изображением
    
    if (messageInput.value && currentChatId !== null) {
        const message = { text: messageInput.value };

        const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
        savedChats[currentChatId].messages.push(message);
        localStorage.setItem('chats', JSON.stringify(savedChats));

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = messageInput.value;
        chatMessages.appendChild(messageDiv);
        messageInput.value = ''; // Очистка поля ввода

        chatMessages.scrollTop = chatMessages.scrollHeight; // Прокрутка вниз

        // Скрываем изображение
        chatImage.style.display = 'none';
    }
}

// Удаление чата
function deleteChat(index) {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    savedChats.splice(index, 1);
    localStorage.setItem('chats', JSON.stringify(savedChats));
    loadChats();
    document.getElementById('chat-messages').innerHTML = ''; // Очистка сообщений
    currentChatId = null; // Сброс текущего чата
}

// Инициализация первого чата при загрузке страницы
function initializeFirstChat() {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    if (savedChats.length === 0) {
        const firstChat = { messages: [] }; // Создаем первый чат
        savedChats.push(firstChat);
        localStorage.setItem('chats', JSON.stringify(savedChats));
    }
    loadChats();
    loadChat(0); // Загружаем первый чат
}

// Загрузка чатов при загрузке страницы
window.onload = initializeFirstChat;


////////////
// Пример функции отправки сообщения
async function sendMessage(chatId, messageText) {
    const response = await fetch(`/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText })
    });
    const result = await response.json();
    console.log(result);
}
