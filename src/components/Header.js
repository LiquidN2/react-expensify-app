import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { startLogout } from './../actions/auth';

export const Header = props => {
    return ( 
        <header>
            <h1>Expensify</h1>
            <ul>
                <li><NavLink to="/dashboard" activeClassName="is-active" exact={true}>Home</NavLink></li>
                <li><NavLink to="/create" activeClassName="is-active">Add Expense</NavLink></li>
                <button onClick={props.startLogout}>Logout</button>
            </ul>
        </header>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        startLogout: () => dispatch(startLogout())
    };
};

export default connect(undefined, mapDispatchToProps)(Header);