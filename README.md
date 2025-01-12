# Decentrathon Project

This project was created as part of the "Decentrathon" hackathon by a team of four members. Below is a detailed description of the components and goals of the project.

## Team Members
- **Zinetov Alikhan**: Responsible for the machine learning model that predicts whether a person is at risk of having a heart attack based on their data.
- **Pernebek Abylay**: Responsible for website design and implemented features for a night theme and multilingual support (three languages).
- **Alexandr Chshudro**: Responsible for the AI chat and integrating functionalities with the Flask framework.
- **Alpieva Leila**: Responsible for integrating MongoDB and developing the registration and login functionalities.

## Overview
The project is centered around a medical application aimed at improving user health outcomes through predictive analytics and interactive features. 

### Key Features:
1. **Machine Learning Model**:
   - A predictive model is implemented to determine the likelihood of a heart attack based on user-provided data.
   - The notebook file for the model implementation is `heartproject.ipynb`.
   - The trained model is saved in the file `HeartDisease.h5`.

2. **User Authentication**:
   - The system supports user login and registration functionalities.
   - These features are implemented using MongoDB for storing user data securely.

3. **AI-Powered Chat**:
   - An interactive chat feature is included to assist users with medical questions and provide advice.
   - This feature simulates an AI-based consultation service.
   - Developed using Flask framework.

4. **Website Design**:
   - Includes a responsive and visually appealing design.
   - Features a night theme for better user experience in low-light environments.
   - Supports multilingual functionality with three language options.

5. **Backend Integration**:
   - The project is powered by the Flask framework.
   - All server-side functionalities, including user authentication and chat system, are handled in the file `chatserver.py`.

## Project Structure
```
project/
├── __pycache__/
├── images/
├── HeartDisease.h5
├── README.md
├── chat.css
├── chat.html
├── chat.js
├── chatserver.py
├── heart.csv
├── heartproject.ipynb
├── mainpage.css
├── mainpage.html
├── forecast.html
├── script.js
├── styles.css
├── requirements.txt
```

## Future Work
- Enhance the AI chat system to provide more accurate and diverse medical responses.
- Improve the machine learning model by incorporating more data.
- Implement additional health-related predictive tools.

## How to Run the Project
1. Install the required dependencies using `pip install -r requirements.txt`.
2. Run the Flask server with the following command:
   ```bash
   python chatserver.py
   ```
3. Access the web interface at `http://127.0.0.1:5000/`.

## Acknowledgments
This project was developed with the goal of leveraging AI to improve healthcare accessibility and outcomes. Special thanks to the Decentrathon organizers for providing this opportunity.

