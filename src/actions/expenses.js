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
// only works with redux-thunk installed - see store/configureStore.js

// ADD_EXPENSE - pure redux action generator returning action obj
export const addExpense = expense => ({
    type: 'ADD_EXPENSE',
    expense
});

// ADD_EXPENSE - perform async CRUD actions with firebase and then dispatch regular redux action 
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

// REMOVE_EXPENSE - async
export const setRemoveExpense = id => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense(id));
        });
    };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// EDIT_EXPENSE - async
export const setEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update({ ...updates }).then(() => {
            dispatch(editExpense(id, updates));
        });
    };
};

// SET_EXPENSES
export const setExpenses = expenses => ({
    type: 'SET_EXPENSES',
    expenses
});

// SET_EXPENSES - async
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
