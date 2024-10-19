import pandas as pd
import numpy as np
import websockets
import asyncio
import json
from sklearn.preprocessing import RobustScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV
import warnings

# Нормальные параметры для сравнения
normal_parameters = {
    "age": 50,
    "sex": 0,  # 0 - женский, 1 - мужской
    "chest_pain": 1,
    "resting_bp": 120,
    "cholesterol": 200,
    "fasting_bs": 100,
    "resting_ecg": 0,
    "max_hr": 150,
    "exercise_angina": 0,
    "oldpeak": 1.0,
    "slope": 1,
    "vessels": 1,
    "thal": 1
}

def compare_parameters(data):
    comparison_message = ""
    for key, normal_value in normal_parameters.items():
        if key in data and float(data[key]) > normal_value:
            comparison_message += f"{key.capitalize()} is higher than normal. "
        elif key in data and float(data[key]) < normal_value:
            comparison_message += f"{key.capitalize()} is lower than normal. "
        else:
            comparison_message += f"{key.capitalize()} is normal. "
    return comparison_message

def generate_prediction_message(prediction):
    return "Low risk of heart attack" if prediction == 0 else "High risk of heart attack"

warnings.filterwarnings("ignore")

# Загрузка вашего набора данных
df = pd.read_csv("heart.csv")

# Определяем функции и параметры
X = df.drop(['output'], axis=1)
y = df[['output']]

# Масштабирование и разделение данных
scaler = RobustScaler()
X_scaled = scaler.fit_transform(X)
X_scaled_df = pd.DataFrame(X_scaled, columns=X.columns)
X_train, X_test, y_train, y_test = train_test_split(X_scaled_df, y, test_size=0.2, random_state=42)

# Поиск лучших параметров
svm = SVC()
parameters = {"C": np.arange(1, 10, 1), 'gamma': [0.00001, 0.00005, 0.0001, 0.0005, 0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5]}
searcher = GridSearchCV(svm, parameters)
searcher.fit(X_train, y_train)
best_model = searcher.best_estimator_

async def predict(websocket, path):
    async for message in websocket:
        data = json.loads(message)

        # Извлекаем входные данные и масштабируем
        input_features = [
            data["age"],
            data["sex"],
            data["chest_pain"],
            data["resting_bp"],
            data["cholesterol"],
            data["fasting_bs"],
            data["resting_ecg"],
            data["max_hr"],
            data["exercise_angina"],
            data["oldpeak"],
            data["slope"],
            data["vessels"],
            data["thal"]
        ]
        
        scaled_features = scaler.transform([input_features])

        # Делаем предсказание
        prediction = best_model.predict(scaled_features)

        # Генерация сообщений
        risk_message = generate_prediction_message(prediction[0])
        comparison_message = compare_parameters(data)

        # Отправляем результаты обратно
        await websocket.send(json.dumps({"prediction": risk_message, "comparison": comparison_message}))

# Запуск сервера
start_server = websockets.serve(predict, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
