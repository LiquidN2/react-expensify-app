import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { setEditExpense, setRemoveExpense } from './../actions/expenses';


export class EditExpensePage extends React.Component {
    onSubmit = expense => {
        this.props.setEditExpense(this.props.expense.id, { ...expense });
        this.props.history.push('/');
    }

    onClick = event => {
        this.props.setRemoveExpense(this.props.expense.id);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onClick}>
                    Remove
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(expense => expense.id === props.match.params.id)
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setEditExpense: (expenseId, expenseObj) => dispatch(setEditExpense(expenseId, expenseObj)),
        setRemoveExpense: expenseId => dispatch(setRemoveExpense(expenseId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);


// const EditExpensePage = props => {
//     return (
//         <div>
//             <ExpenseForm 
//                 expense={props.expense}
//                 onSubmit={expense => {
//                     props.dispatch(editExpense(props.expense.id, {...expense}));
//                     props.history.push('/');
//                 }}
//             />
//             <button 
//                 onClick={(event) => {
//                     props.dispatch(removeExpense(props.expense.id));
//                     props.history.push('/');
//                 }}
//             >
//                 Remove
//             </button>
//         </div>
//     );
// };

// const mapStateToProps = (state, props) => {
//     return {
//         expense: state.expenses.find(expense => expense.id === props.match.params.id)
//     }
// };

// export default connect(mapStateToProps)(EditExpensePage);