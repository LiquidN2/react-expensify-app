import {addExpense, editExpense, removeExpense} from './../../actions/expenses';

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
    const expenseData = {
        description: 'Water bill',
        note: 'Test',
        amount: 100,
        createdAt: 500000000
    };
    const action = addExpense(expenseData);
    expect(action).toMatchObject({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action obj with default values', () => {
    const action = addExpense();
    expect(action).toMatchObject({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});