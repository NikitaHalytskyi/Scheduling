import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import MonthReport from './components/MonthReport';
import User from './components/User';
import VacationApproving from './components/VacationApproving';
import VacationRequest from './components/VacationRequest';

import './custom.css'


export default () => (
    <Layout>
        <Route exact path='/' component={User} />
        <Route exact path='/vacationrequest' component={VacationRequest} />
        <Route exact path='/considervacationrequest' component={VacationApproving} />
        <Route exact path='/MonthReport' component={MonthReport} />
    </Layout>
);
