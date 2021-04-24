import * as React from 'react';
import { Redirect, Route } from 'react-router';
import Layout from './components/Layout';
import { ResetPassword } from './components/ResetPassword';
import { RestorePassword } from './components/RestorePassword';
import User from './components/User';
import VacationRequest from './components/VacationRequest';

import './custom.css'


export default () => (
    <Layout>
        <Route exact path="/restorePassword" component={RestorePassword} />
        <Route exact path="/resetPassword/:token" component={ResetPassword} />
        <Route exact path="/resetPassword">
            <Redirect to="/"></Redirect>
        </Route>
        <Route exact path='/vacationrequest' component={VacationRequest} />
        <Route exact path='/' component={User} />
    </Layout>
);
