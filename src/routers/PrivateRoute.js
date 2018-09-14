import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from './../components/Header';

export const PrivateRoute = props => {
    const { 
        isAuthenticated,
        component: Component,
        ...rest
    } = props;

    // show protected component if authenticated
    const PrivateComponent = props => {
        if (isAuthenticated) {
            return (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            );
        } else {
            return ( 
                <Redirect to="/" /> 
            );
        }
    };

    return (
        <Route {...rest} component={PrivateComponent} />
    );
};

const mapStatesToProps = state => {
    return {
        isAuthenticated: !!state.auth.uid
    };
};

export default connect(mapStatesToProps)(PrivateRoute);