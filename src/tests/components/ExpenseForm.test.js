import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

// ExpenseForm will use moment from __mocks__/moment.js instead to get fixed date
import ExpenseForm from './../../components/ExpenseForm';
import expenses from './../fixtures/expenses';

//-----------
test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

//-----------
test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

//-----------
test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    // provide mock 'event' object with preventDefault method
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper.state('error')).toBe('Please provide description and amount');
    expect(wrapper).toMatchSnapshot();
});

//-----------
test('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);

    // provide mock 'event' object with 'target' property 
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

//-----------
test('should set note on textarea change', () => {
    const value = 'New note';
    const wrapper = shallow(<ExpenseForm />);

    // provide mock 'event' object with 'target' property
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

//-----------
test('should set amount if valid input', () => {
    const value = '50.20';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

//-----------
test('should not set amount if invalid input', () => {
    const value = 'ABC';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

//-----------
test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn(); // this is a spy or mock function
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toEqual('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note
    });
});

//-----------
test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('#expense_date').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

//-----------
test('should set calenderFocused on focus change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('#expense_date').prop('onFocusChange')({ focused: true });
    expect(wrapper.state('calendarFocused')).toBeTruthy();
});
