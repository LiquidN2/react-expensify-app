import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from './../actions/expenses';

class AddExpensePage extends React.Component {
    onSubmit = expense => {
        this.props.onSubmit(expense); // see mapDispatchToProps
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: expense => dispatch(addExpense(expense))
});

export { AddExpensePage };

export default connect(undefined, mapDispatchToProps)(AddExpensePage);

// const AddExpensePage = props => {
//     return (
//         <div>
//             <h1>Add Expense</h1>
//             <ExpenseForm 
//                 onSubmit={expense => {
//                     props.dispatch(addExpense(expense));
//                     props.history.push('/');
//                 }}
//             />
//         </div>
//     );
// };

// export default connect()(AddExpensePage);