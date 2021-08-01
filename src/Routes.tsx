import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import AuthRoute from './routing/AuthRoute';
import { PagesRoutes } from './routing/PagesRoutes';

type Props = {};

const Routes = ({ }: Props) => {
    // const noFeatureComp = () => <ExceptionPage status={404} title="Doesn't have access to this feature" />;

    return (
        <>
            <Switch>
                <AuthRoute component={<div>Implement game</div>} exact path={PagesRoutes.Game} />
                <Route path={PagesRoutes.Login}>
                    <div>
                        implement Login comp
                    </div>
                </Route>
            </Switch>
        </>
    );
};
export default Routes;