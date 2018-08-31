import {createStore} from 'redux';

// Action generators
const incrementCount = ({amount = 1} = {}) => ({
    type: 'INCREMENT',
    amount
});

const decrementCount = ({amount = 1} = {}) => ({
    type: 'DECREMENT',
    amount
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({amount} = {}) => ({
    type: 'SET',
    amount
});

// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = (state = {count: 0}, action) => {
    const { type, amount } = action;    
    
    switch(type) {
        case 'INCREMENT':
            return { count: state.count + amount };
        
        case 'DECREMENT':
            return { count: state.count - amount };

        case 'SET': 
            return { count: amount };
        
        case 'RESET':
            return { count: 0 };
        
        default:
            return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    //execute this everytime store changes
    console.log(store.getState());
});

// store.dispatch({
//     type: 'INCREMENT', 
//     amount: 5
// });
store.dispatch(incrementCount());
store.dispatch(incrementCount({ amount: 10}));

store.dispatch(decrementCount());
store.dispatch(decrementCount({ amount: 3}));

// call this will stop
// unsubscribe();

store.dispatch(resetCount());

store.dispatch(setCount({ amount: 2500 }));