import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCCk6oaOCvMd8ebqj_5_tLkCymLe5we0ow",
    authDomain: "expensify-21557.firebaseapp.com",
    databaseURL: "https://expensify-21557.firebaseio.com",
    projectId: "expensify-21557",
    storageBucket: "expensify-21557.appspot.com",
    messagingSenderId: "392780525801"
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };