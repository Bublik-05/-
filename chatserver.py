from flask import Flask, jsonify, request

app = Flask(__name__)  # Создаем приложение Flask

# Данные будут временно храниться в памяти, как пример
chats = []

# Маршрут для создания нового чата
@app.route('/chats', methods=['POST'])
def create_chat():
    new_chat = {"id": len(chats) + 1, "messages": []}  # Создаем новый чат с уникальным ID
    chats.append(new_chat)  # Сохраняем чат в списке
    return jsonify(new_chat)  # Возвращаем созданный чат в виде JSON

# Маршрут для получения всех чатов
@app.route('/chats', methods=['GET'])
def get_chats():
    return jsonify(chats)  # Возвращаем все чаты в виде JSON

# Маршрут для отправки сообщения в чат
@app.route('/chats/<int:chat_id>/messages', methods=['POST'])
def send_message(chat_id):
    data = request.json  # Получаем данные от клиента (сообщение)
    message = data['message']  # Извлекаем сообщение
    for chat in chats:
        if chat['id'] == chat_id:  # Ищем нужный чат по ID
            chat['messages'].append(message)  # Добавляем сообщение в чат
            return jsonify({"status": "Message added"})  # Возвращаем успешный ответ
    return jsonify({"error": "Chat not found"}), 404  # Если чат не найден

# Маршрут для получения сообщений конкретного чата
@app.route('/chats/<int:chat_id>', methods=['GET'])
def get_chat(chat_id):
    for chat in chats:
        if chat['id'] == chat_id:
            return jsonify(chat)  # Возвращаем чат с сообщениями
    return jsonify({"error": "Chat not found"}), 404  # Если чат не найден

if __name__ == '__main__':
    app.run(debug=True)  # Запускаем сервер
