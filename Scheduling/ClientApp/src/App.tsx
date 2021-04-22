import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import User from './components/User';
import { UserManagement } from './components/UserManagement';
import VacationRequest from './components/VacationRequest';

import './custom.css'


export default () => (
    <Layout>
        <Switch>
        <Route exact path='/' component={User} />
        <Route exact path='/vacationrequest' component={VacationRequest} />
        {/* <Route exact path='/usermanagement' component={UserManagement} /> */}
        <ProtectedRoute exact path='/usermanagement' component={UserManagement} />
        </Switch>
    </Layout>
);
