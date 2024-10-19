# predictor.py

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
