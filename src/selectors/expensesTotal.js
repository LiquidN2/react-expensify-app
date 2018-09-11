// const getTotalExpenses = expenses => {
//     let total = 0;
//     if (expenses.length > 0) {
//         expenses.forEach(({ amount }) => {
//             total += amount;
//         });
//     }
//     return total;
// }

const getTotalExpenses = expenses => {
    let total = 0;
    if (expenses.length > 0) {
        const amounts = expenses.map(expense => expense.amount);
        total = amounts.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    return total;
}

export default getTotalExpenses;