import {createStore} from 'redux';

const store = createStore((state = {count: 0}, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        
        case 'DECREMENT':
            if(state.count > 0) {
                return { count: state.count - 1 };
            } else {
                return { count: 0 };
            }
        
        case 'RESET':
            return { count: 0 };
        
        default:
            return state;

    }
});

console.log(store.getState());

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'DECREMENT'
});

console.log(store.getState());

store.dispatch({
    type: 'RESET'
});

console.log(store.getState());
