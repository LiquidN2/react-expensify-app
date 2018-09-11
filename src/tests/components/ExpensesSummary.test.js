import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseSummary } from '../../components/ExpensesSummary';
import getTotalExpenses from '../../selectors/expensesTotal';
import expenses from '../fixtures/expenses';

test('should render expense summary correctly', () => {
    const totalExpenses = getTotalExpenses(expenses);
    const wrapper = shallow(
        <ExpenseSummary 
            expensesCount={expenses.length}
            expensesTotal={totalExpenses}
        />
    );
    expect(wrapper).toMatchSnapshot();
});
