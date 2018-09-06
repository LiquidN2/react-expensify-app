import React from 'react';
import { shallow } from 'enzyme';

// import unconnected EditExpensePage component
import { EditExpensePage } from './../../components/EditExpensePage';
import expenses from './../fixtures/expenses';

let onSubmitEditExpense, onRemoveExpense, history, wrapper;

beforeEach(() => {
    onSubmitEditExpense = jest.fn();
    onRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage 
            expense={expenses[0]} 
            editExpense={onSubmitEditExpense}
            removeExpense={onRemoveExpense} 
            history={history} 
        />
    );
});

test('should render edit expense page correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click');
    expect(onRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle editExpesne', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(onSubmitEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});