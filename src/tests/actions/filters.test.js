import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './../../actions/filters';

test('should setup text in filter obj with provided value', () => {
    const filterText = 'rent';
    const action = setTextFilter(filterText);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: filterText
    });
});

test('should setup text in filter obj with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should setup sort by date in filter obj', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('should setup sort by amount in filter obj', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('should setup start date in filter obj', () => {
    const startDate = 5000000000;
    const action = setStartDate(startDate);
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate
    });
});

test('should setup end date in filter obj', () => {
    const endDate = 1000000000;
    const action = setEndDate(endDate);
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate
    });
});