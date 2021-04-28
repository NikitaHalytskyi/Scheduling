import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import { ResetPassword } from './components/ResetPassword';
import { RestorePassword } from './components/RestorePassword';
import TimerPage from './components/TimerPage';
import User from './components/User';
import VacationRequest from './components/VacationRequest';
import { Error403 } from './components/Error403';

import './custom.css'


export default () => (
    <Layout>
        <Route exact path="/restorePassword" component={RestorePassword} />
        <Route exact path="/resetPassword/:token" component={ResetPassword} />
        <Route exact path="/resetPassword">
            <Error403></Error403>
        </Route>
        <Route exact path='/vacationrequest' component={VacationRequest} />
        <Route exact path='/' component={User} />
        <Route exact path='/timer' component={TimerPage} />
    </Layout>
);
