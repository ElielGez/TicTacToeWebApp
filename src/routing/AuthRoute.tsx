import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PagesRoutes } from './PagesRoutes';

const AuthRoute = ({ component, ...rest }: any) => {
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    let loginRefer = PagesRoutes.Login;
    if (rest.location.pathname !== '/') {
        loginRefer += `?refer=${encodeURIComponent(rest.location.pathname + rest.location.search)}`;
    }
    const Component = component;
    return (
        <>
            {!token && <Redirect to={loginRefer} />}
            <Route
                {...rest}
                render={(props) => {
                    if (token) {
                        return (
                            <div>
                                <Component {...props} />
                            </div>
                        );
                    } else return null;
                }}
            />
        </>
    );
};


export default AuthRoute;