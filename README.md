Kartta-appi is a mobile application developed with React Native and Expo, 
designed to track and save the user's geographical location. Users can view their current coordinates, 
display their location on a map, and save specific locations to a database for future reference. 
The application integrates with Firebase to store location data securely.

The main purpose of this app is to provide users with a simple and intuitive way to track their geographical location, 
save specific points of interest, and view a history of saved locations. Whether you're traveling, exploring new places, 
or just need to remember specific locations, this app makes it easy to keep track of where you've been. 
The integration with Firebase ensures that your location data is stored securely and can be accessed anytime.

NOTE - This app is tested only on android

Installation
A step by step series of examples that tell you how to get a development environment running.

Clone the Repository

Install Dependencies (npm install)

Create a Firebase Project

Go to Firebase Console and create a new project.

Configure Config.js in firebase folder

const firebaseConfig = {<br>
  apiKey: "YOUR_API_KEY",<br>
  authDomain: "YOUR_AUTH_DOMAIN",<br>
  projectId: "YOUR_PROJECT_ID",<br>
  storageBucket: "YOUR_STORAGE_BUCKET",<br>
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",<br>
  appId: "YOUR_APP_ID"<br>
};

Start the Project (npm start)
