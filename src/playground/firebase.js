console.log('setting up database');

import * as firebase from 'firebase';
import moment from 'moment';

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

// const onValueChange = snapshot => {
//     const expenses = [];
//     snapshot.forEach(childSnapshot => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot
//         });
//     });
//     console.log(expenses);
// }

// database.ref('expenses')
//     .once('value')
//     .then(onValueChange)
//     .catch(err => console.log(err));

database.ref('expenses').on('child_changed', snapshot => {
    console.log(snapshot.key, snapshot.val());
});

// const expenses = [{
//     id: '1',
//     description: 'Gum',
//     note: '',
//     amount: 195,
//     createdAt: 0
// }, {
//     id: '2',
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     createdAt: moment(0).subtract(4, 'days').valueOf()
// }, {
//     id: '3',
//     description: 'Credit Card',
//     note: '',
//     amount: 4500,
//     createdAt: moment(0).add(4, 'days').valueOf()
// }];

// expenses.forEach(expense => {
//     database.ref('expenses').push(expense)
//         .then(() => console.log('expense inserted'))
//         .catch(err => console.log('unable to insert data', err));
// });

// database.ref('notes/-LMA8VzPxa2IQxZOtZiS')
//     .once('value')
//     .then(snapshot => console.log(snapshot.val()))
//     .catch(err => console.log('unable to fetch data', err));

// database.ref('notes').push({
//     title: 'Pay rent',
//     body: 'Pay rent'
// });

// Setting data - will wipe all current data
// database.ref().set({
//     name: 'Hugh Nguyen',
//     age: 33,
//     stressLevel: 5,
//     location: {
//         city: 'Sydney',
//         country: 'Australia'
//     },
// }).then(() => {
//     console.log('data is saved');
// }).catch(err => {
//     console.log('This failed.', err);
// });
// database.ref('age').set(20);
// database.ref('location/city').set('Saigon');
// database.ref('location/country').set('Vietnam');
// database.ref('attributes').set({
//     height: 175,
//     weight: 71
// });

// database.ref('attributes/weight').remove()
//     .then(() => {
//         console.log('data removed');
//     })
//     .catch(err => {
//         console.log('unable to remove data');
//     })

// Updating data - will keep all current data and update new data
// database.ref().update({
//     name: 'John Doe',
//     age: 25,
//     'location/city': 'Boston'
// });

// Fetching data 
// database.ref()
//     .once('value')
//     .then(snapshot => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch(err => {
//         console.log('Error fetching data', err);
//     });
// Firebase will send data for every update
// const onValueChange = snapshot => {
//     console.log(snapshot.val());
// };

// database.ref().on('value', onValueChange);

// setTimeout(() => {
//     database.ref().update({ age: 26 });
// }, 5000);

// setTimeout(() => {
//     database.ref().off(); // removing all subscription
//     // database.ref().off(onValueChange); // remove specific subscription
//     database.ref().update({ 'location/city': 'Sydney' });
// }, 10000);

// setTimeout(() => {
//     database.ref().update({ age: 28 });
// }, 15000);

