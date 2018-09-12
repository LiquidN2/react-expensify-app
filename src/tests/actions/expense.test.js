import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startAddExpense, addExpense, editExpense, removeExpense } from './../../actions/expenses';
import expenses from './../fixtures/expenses';
import database from './../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action obj', () => {
    const idToRemove = 'asdv165asdv';
    const action = removeExpense(idToRemove);
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: idToRemove
    });
});

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

test('should setup add expense action obj with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toMatchObject({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', done => {
    const store = createMockStore({});
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
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with default to database and store', done => {
    const store = createMockStore({});
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
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

// test('should setup add expense action obj with default values', () => {
//     const action = addExpense();
//     expect(action).toMatchObject({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });