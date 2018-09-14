import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = props => {
    const { 
        isAuthenticated,
        component: Component,
        ...rest
    } = props;

    // show protected component if authenticated
    const PublicComponent = props => {
        if (isAuthenticated) {
            return (
                <Redirect to="/dashboard" /> 
            );
        } else {
            // this case it will return the LoginPage component
            return ( 
                <Component {...props} />
            );
        }
    };

    return (
        <Route {...rest} component={PublicComponent} />
    );
};

const mapStatesToProps = state => {
    return {
        isAuthenticated: !!state.auth.uid
    };
};

export default connect(mapStatesToProps)(PublicRoute);