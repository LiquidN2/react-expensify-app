import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

moment.locale('en-au');
// const now = moment();
// console.log(typeof now);

class ExpenseForm extends React.Component {
    state = {
        description: '',
        note: '',
        amount: '',
        createdAt: moment(),
        calendarFocused: false,
        error: ''
    };

    onDescriptionChange = event => {
        const description = event.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = event => {
        const note = event.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = event => {
        const amount = event.target.value;

        // validate 2 decimal float number
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = createdAt => {
        if(createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (event) => {
        event.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({error: 'Please provide description and amount'}));
        } else {
            this.setState(() => ({error: ''}));
            // console.log('submitted');
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, //amount in cents
                createdAt: this.state.createdAt.valueOf(), // convert moment obj to Unix timetamp in ms
                note: this.state.note
            })
        }
    }

    render() {
        return (
            <div>
                {!!this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        id="expense_date"
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    };
}

export default ExpenseForm;