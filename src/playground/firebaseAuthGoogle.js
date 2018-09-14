import React from 'react';
import ReactDOM from 'react-dom';
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

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('User logged in');
    } else {
        console.log('User logged out');
    }
});

const login = () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
};

const onLogin = () => {
    login().then(user => {
        if(user) {
            console.log('logged in');
        } else {
            console.log('logged out');
        }
    }).catch(err => console.log('login err', err));
};

const logout = () => {
    return firebase.auth().signOut();
};

const onLogout = () => {

}

const LoginButton = props => {
    return (
        <button onClick={onLogin}>Login</button>
    );
};

const LogoutButton = props => {
    return (
        <button onClick={logout}>Logout</button>
    );
};

const Wrapper = props => {
    return (
        <div>
            <LoginButton />
            <LogoutButton />
        </div>
    )
}

ReactDOM.render(<Wrapper />, document.getElementById('app'));