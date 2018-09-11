import getTotalExpenses from './../../selectors/expensesTotal';
import expenses from './../fixtures/expenses';

test('should return total expenses correctly', () => {
    const totalExpenses = getTotalExpenses(expenses);
    expect(totalExpenses).toEqual(114195);
});
