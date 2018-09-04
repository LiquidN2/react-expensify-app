import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
// const removeExpense = ({ id } = {}) => ({
//     type: 'REMOVE_EXPENSE',
//     id
// });
const removeExpense = id => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            // return state.concat(action.expense);
            return [...state, action.expense];

        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if (expense.id === action.id) {
                    return { ...expense, ...action.updates };
                } else {
                    return expense;
                }
            });

        default:
            return state;
    }
};

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state, 
                text: action.text
            };
        
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };    

        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };

        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };

        default:
            return state;
    }
};

// Get Visible Expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    const results = expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            // return a.createdAt < b.createdAt ? 1 : -1;
            return b.createdAt - a.createdAt;
        } else if (sortBy === 'amount') {
            return b.amount - a.amount;
        }
    });

    return results;
}

// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log('---------',state.filters,'-----------');
    console.log(visibleExpenses);
    
})

const expenseOne = store.dispatch(addExpense({ 
    description: 'Phone bill', 
    amount: 40, 
    createdAt: -3000
}));

const expenseTwo = store.dispatch(addExpense({ 
    description: 'Rent', 
    amount: 1000, 
    createdAt: 2000
}));

const expenseThree = store.dispatch(addExpense({ 
    description: 'Utility bill', 
    amount: 500, 
    createdAt: 1000
}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(removeExpense(expenseOne.expense.id));

store.dispatch(editExpense(expenseTwo.expense.id, {amount: 2000}));

// store.dispatch(setTextFilter('Rent'));
// store.dispatch(setTextFilter('bill'));

store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(1500));

// store.dispatch(setEndDate(2500));

// store.dispatch(setTextFilter());

//---------------------------------------
const demoState = {
    expenses: [{
        id: 'vaerwg348',
        description: 'January rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],

    filters: {
        text: 'rent',
        sortBy: 'amount', // or date
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: 'Hugh',
//     age: 33
// };

// console.log({
//     ...user,
//     location: 'Sydney'
// });