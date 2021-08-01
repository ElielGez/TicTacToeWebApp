import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './components/Game';
import Login from './components/Login';
import AuthRoute from './routing/AuthRoute';
import { PagesRoutes } from './routing/PagesRoutes';

type Props = {};

const Routes = ({ }: Props) => {
    return (
        <>
            <Switch>
                <AuthRoute component={Game} exact path={PagesRoutes.Game} />
                <Route path={PagesRoutes.Login}>
                    <Login />
                </Route>
            </Switch>
        </>
    );
};
export default Routes;