import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

// moment.locale('en-au');
const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>${parseFloat(amount/100).toFixed(2)} - {moment(createdAt).format('L')}</p>
    </div>
);

export default ExpenseListItem;