import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './../actions/filters';


class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.props.filters.text}
                    onChange={(event) => {
                        this.props.dispatch(setTextFilter(event.target.value));
                    }}
                />
                <select
                    value={this.props.filters.sortBy}
                    onChange={(event) => {
                        switch (event.target.value) {
                            case 'date':
                                this.props.dispatch(sortByDate());
                                break;
                            case 'amount':
                                this.props.dispatch(sortByAmount());
                                break;
                            default:
                                this.props.dispatch(sortByDate());
                        }
                    }}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    startDateId="start_date_id"
                    endDate={this.props.filters.endDate}
                    endDateId="end_date_id"
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
            </div>
        );
    }
}

// const ExpenseListFilters = props => (
//     <div>
//         <input
//             type="text"
//             value={props.filters.text}
//             onChange={(event) => {
//                 props.dispatch(setTextFilter(event.target.value));
//             }}
//         />
//         <select
//             value={props.filters.sortBy}
//             onChange={(event) => {
//                 switch (event.target.value) {
//                     case 'date':
//                         props.dispatch(sortByDate());
//                         break;
//                     case 'amount':
//                         props.dispatch(sortByAmount());
//                         break;
//                     default:
//                         props.dispatch(sortByDate());
//                 }
//             }}
//         >
//             <option value="date">Date</option>
//             <option value="amount">Amount</option>
//         </select>
//     </div>
// );

const mapStateToProps = state => {
    return {
        filters: state.filters
    }
};

export default connect(mapStateToProps)(ExpenseListFilters);