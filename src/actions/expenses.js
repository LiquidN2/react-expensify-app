// import uuid from 'uuid';
import database from './../firebase/firebase';

// High level redux process
// step 1 - component calls action generator passing data
// step 2 - action generator returns object with action type (and data)
// step 3 - component call dispatch passing in the newly returned obj in step 2
// step 4 - redux store is updated

// Redux process with 'redux-thunk' package in order to work with firebase
// step 1 - component calls action generator passing data
// step 2 - action generator returns object with action type (and data)
// step 3 - component call dispatch passing in the newly returned obj in step 2
// step 4 - redux store is updated

// ADD_EXPENSE
export const addExpense = expense => ({
    type: 'ADD_EXPENSE',
    expense
});

// only works with redux-thunk installed - see store/configureStore.js
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt };

        return database.ref('expenses').push(expense).then(ref => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = id => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_EXPENSES
export const setExpenses = expenses => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then(snapshot => {
            const expenses = [];
            snapshot.forEach(childSnapshot => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    };
};
