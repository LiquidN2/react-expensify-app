import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenses from './../selectors/expenses';
import getTotalExpenses from './../selectors/expensesTotal';

export const ExpenseSummary = props => {
    const expensesWord = props.expensesCount > 1 ? 'expenses' : 'expense';
    return (
        <div>
            <h1>
                Viewing {props.expensesCount} {expensesWord} totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}
            </h1>
        </div>
    );
};

const mapStateToProps = state => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: getTotalExpenses(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);