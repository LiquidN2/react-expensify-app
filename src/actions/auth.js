import { firebase, googleAuthProvider } from './../firebase/firebase'; 

export const login = uid => {
    return { 
        type: 'LOGIN',
        uid
    };
};

// startLogin created as action obj to pass to compoment as props via mapDispatchToProps
// this helps writting test case
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

// startLogin created as action obj to pass to compoment as props via mapDispatchToProps
// this helps writting test case
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};