import moment from 'moment';
import expenseReducer from '../../reducers/expenses';
import expenses from './../fixtures/expenses';

test('should set default state', () => {
    const state = expenseReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('shoudl add expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '4',
            description: 'Mobile phone',
            note: '',
            amount: 35,
            createdAt: moment(0).add(5, 'days').valueOf()
        }
    }
    const state = expenseReducer(expenses, action);
    expect(state.length).toBe(4);
});

test('should remove expense', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '1'
    };
    const state = expenseReducer(expenses, action);
    expect(state.length).toBe(2);
    expect(state).toEqual([{
        id: '2',
        description: 'Rent',
        note: '',
        amount: 109500,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    }, {
        id: '3',
        description: 'Credit Card',
        note: '',
        amount: 4500,
        createdAt: moment(0).add(4, 'days').valueOf()
    }]);
});

test('should edit expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '2',
        updates: {
            amount: 20000
        }
    }
    const state = expenseReducer(expenses, action);
    expect(state[1].amount).toBe(20000);
});