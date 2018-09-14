import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    addExpense,
    startAddExpense,
    editExpense,
    setEditExpense,
    removeExpense,
    setRemoveExpense,
    setExpenses,
    startSetExpenses
} from './../../actions/expenses';
import expenses from './../fixtures/expenses';
import database from './../../firebase/firebase';

const uid = 'thisIsMyTestUID1234';
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
    const expensesData = {};
    expenses.forEach(expense => {
        const { id, description, note, amount, createdAt } = expense;
        expensesData[id] = { description, note, amount, createdAt };
    });

    database.ref(`users/${uid}/expenses`).set(expensesData)
        .then(() => done())
        .catch(err => done(err));
});


// ------ EDIT_EXPENSE --------
test('should setup edit expense action obj', () => {
    const idToEdit = 'adfv565';
    const updates = {
        description: 'Rent',
        amount: 100
    };
    const action = editExpense(idToEdit, updates);
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: idToEdit,
        updates: {
            description: 'Rent',
            amount: 100
        }
    })
});

test('should edit expense in database', done => {
    const id = '0';
    
    const updates = {
        description: 'Coffee',
        amount: 350
    };

    const store = createMockStore({ 
        auth: { uid } 
    });

    store.dispatch(setEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id, 
            updates 
        });

        return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val().description).toBe(updates.description);
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    }).catch(err => done(err));
});


// ------ ADD_EXPENSE --------
test('should setup add expense action obj with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toMatchObject({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', done => {
    const store = createMockStore({ 
        auth: { uid } 
    });

    const expenseData = {
        description: 'Laptop',
        note: 'Macbook pro',
        amount: 200000,
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    }).catch(err => done(err));
});

test('should add expense with default to database and store', done => {
    const store = createMockStore({ 
        auth: { uid } 
    });

    const expenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };
    
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    }).catch(err => done(err));
});


// ------ SET_EXPENSES --------
test('should setup set expenses action obj with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', done => {
    const store = createMockStore({ 
        auth: { uid } 
    });

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    }).catch(err => done(err));
});


// ------ REMOVE_EXPENSE --------
test('should setup remove expense action obj', () => {
    const idToRemove = 'asdv165asdv';
    const action = removeExpense(idToRemove);
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: idToRemove
    });
});

test('should remove expense from database', done => {
    const id = '1';
    const store = createMockStore({ 
        auth: { uid } 
    });

    store.dispatch(setRemoveExpense(id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toBeFalsy();
        done();
    }).catch(err => done(err));
});
