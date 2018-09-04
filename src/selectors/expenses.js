import moment from 'moment';

// Get Visible Expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    const results = expenses.filter(expense => {
        const createdMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            // return a.createdAt < b.createdAt ? 1 : -1;
            return b.createdAt - a.createdAt;
        } else if (sortBy === 'amount') {
            return b.amount - a.amount;
        }
    });

    return results;
}

export default getVisibleExpenses;