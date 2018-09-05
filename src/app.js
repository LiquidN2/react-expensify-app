import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import moment from 'moment';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

moment.locale('en-au');

const store = configureStore();

store.dispatch(addExpense({description: 'Gas bill', amount: 80, createdAt: 1536026400000}));
store.dispatch(addExpense({description: 'Water bill', amount: 100, createdAt: 500000000000}));
store.dispatch(addExpense({description: 'Rent', amount: 1000, createdAt: 600000000}));

// store.dispatch(setTextFilter('water'));
// setTimeout(() => {
//     store.dispatch(setTextFilter('gas'));
// }, 3000)

const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));