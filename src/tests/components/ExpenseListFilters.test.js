import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from './../fixtures/filters';
// import expenses from '../fixtures/expenses';

let onTextChange, onSortByDate, onSortByAmount, onSetStartDate, onSetEndDate, wrapper;

beforeEach(() => {
    onTextChange = jest.fn();
    onSortByDate = jest.fn();
    onSortByAmount = jest.fn();
    onSetStartDate = jest.fn();
    onSetEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={onTextChange}
            sortByDate={onSortByDate}
            sortByAmount={onSortByAmount}
            setStartDate={onSetStartDate}
            setEndDate={onSetEndDate}
        />
    );
});

test('should render expense list filter correcty', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('calendarFocused')).toBeFalsy();
});

test('should render expense list filter with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('calendarFocused')).toBeFalsy();
});

test('should handle text change', () => {
    const value = 'new text filter';
    wrapper.find('input').simulate('change', {
        target: { value }
    });
    expect(onTextChange).toHaveBeenLastCalledWith(value);
});

test('should handle sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(onSortByAmount).toHaveBeenCalled();
});

test('should handle sort by date', () => {
    const value = 'date';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(onSortByDate).toHaveBeenCalled();
});

test('should handle date range change', () => {
    const startDate = moment(0).subtract(4, 'days');
    const endDate = moment(0).add(4, 'days');
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
    expect(onSetStartDate).toHaveBeenLastCalledWith(startDate);
    expect(onSetEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change', () => {
    const calendarFocused = "startDate";
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});
