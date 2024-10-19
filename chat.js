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

        // Проверка, если сообщение содержит текст
        if (message.text) {
            messageDiv.textContent = message.text;
        }

        // Проверка, если сообщение содержит файл
        if (message.file) {
            if (message.file.startsWith('data:image/')) { // Это изображение
                const img = document.createElement('img');
                img.src = message.file;
                img.alt = message.fileName;
                img.style.maxWidth = '200px';
                messageDiv.appendChild(img);
            } else { // Это другой тип файла
                const fileLink = document.createElement('a');
                fileLink.href = message.file;
                fileLink.download = message.fileName;
                fileLink.textContent = `Скачать файл: ${message.fileName}`;
                messageDiv.appendChild(fileLink);
            }
        }

        chatMessages.appendChild(messageDiv);
    });

    chatMessages.style.display = 'block'; // Показать блок сообщений
    chatMessages.scrollTop = chatMessages.scrollHeight; // Прокрутка вниз
}

// Обработка и отображение файла
function handleFileUpload(file) {
    const reader = new FileReader();
    const chatImage = document.getElementById('chat-image'); // Получаем элемент с изображением

    reader.onload = function(event) {
        const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
        if (currentChatId !== null) {
            const message = { text: '', file: event.target.result, fileName: file.name };
            savedChats[currentChatId].messages.push(message);
            localStorage.setItem('chats', JSON.stringify(savedChats));

            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = file.name;
                img.style.maxWidth = '200px';
                messageDiv.appendChild(img);
            } else {
                const fileLink = document.createElement('a');
                fileLink.href = event.target.result;
                fileLink.download = file.name;
                fileLink.textContent = `Скачать файл: ${file.name}`;
                messageDiv.appendChild(fileLink);
            }

            const chatMessages = document.getElementById('chat-messages');
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Прокрутка вниз

            // Скрываем изображение-заставку
            chatImage.style.display = 'none';
        }
    };

    reader.readAsDataURL(file);
}

// Отправка сообщения
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const fileInput = document.getElementById('file-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatImage = document.getElementById('chat-image'); // Получаем элемент с изображением

    // Отправка текстового сообщения
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

        // Скрываем изображение-заставку при отправке текстового сообщения
        chatImage.style.display = 'none';
    }

    // Проверяем, загружен ли файл
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        handleFileUpload(file); // Загрузка и отображение файла
        fileInput.value = ''; // Очистка поля ввода файла
    }
}

// Удаление чата
function deleteChat(index) {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];

    // Удаляем чат из массива
    if (index < savedChats.length) {
        savedChats.splice(index, 1); // Удаляем чат по индексу
        localStorage.setItem('chats', JSON.stringify(savedChats));
        loadChats(); // Обновляем отображаемые чаты

        // Если удален последний чат, очищаем сообщения
        if (savedChats.length === 0) {
            document.getElementById('chat-messages').innerHTML = '';
            currentChatId = null; // Сброс текущего чата
        } else {
            // Загружаем первый чат или следующий после удаленного
            const newIndex = index === savedChats.length ? index - 1 : index; // Если удален последний чат, загружаем предыдущий
            loadChat(newIndex >= 0 ? newIndex : 0);
        }
    }
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
// Функция для открытия модального окна
function openModal(imageSrc) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    modal.style.display = 'block';
    modalImage.src = imageSrc; // Устанавливаем источник изображения
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Обновленная функция для обработки и отображения файла
function handleFileUpload(file) {
    const reader = new FileReader();
    const chatImage = document.getElementById('chat-image'); // Получаем элемент с изображением

    reader.onload = function(event) {
        const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
        if (currentChatId !== null) {
            const message = { text: '', file: event.target.result, fileName: file.name };
            savedChats[currentChatId].messages.push(message);
            localStorage.setItem('chats', JSON.stringify(savedChats));

            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = file.name;
                img.style.maxWidth = '200px';
                img.onclick = () => openModal(img.src); // Открываем модальное окно при нажатии на изображение
                messageDiv.appendChild(img);
            } else {
                const fileLink = document.createElement('a');
                fileLink.href = event.target.result;
                fileLink.download = file.name;
                fileLink.textContent = `Скачать файл: ${file.name}`;
                messageDiv.appendChild(fileLink);
            }

            const chatMessages = document.getElementById('chat-messages');
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Прокрутка вниз

            // Скрываем изображение-заставку
            chatImage.style.display = 'none';
        }
    };

    reader.readAsDataURL(file);
}

// Загрузка чатов при загрузке страницы
window.onload = initializeFirstChat;


