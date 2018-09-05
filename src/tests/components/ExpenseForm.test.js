import React from 'react';
import {shallow} from 'enzyme';

// ExpenseForm will use moment from __mocks__/moment.js instead to get fixed date
import ExpenseForm from './../../components/ExpenseForm';
import expenses from './../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});