import moment from 'moment';
import filtersReducer from './../../reducers/filters';

test('should set default filters', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set text filter', () => {
    const currentState = {
        text: 'old filter text',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const action = {type: 'SET_TEXT_FILTER', text: 'new filter text'}
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('new filter text');
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const action = {type: 'SORT_BY_DATE'}
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set startDate', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const action = {type: 'SET_START_DATE', startDate: moment().startOf('month')}
    const state = filtersReducer(currentState, action);
    expect(state.startDate).toEqual(moment().startOf('month'));
});

test('should set endDate', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const action = {type: 'SET_END_DATE', endDate: moment().endOf('month')};
    const state = filtersReducer(currentState, action);
    expect(state.endDate).toEqual(moment().endOf('month'));
});