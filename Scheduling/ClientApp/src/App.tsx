import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import TimerPage from './components/TimerPage';
import User from './components/User';
import VacationRequest from './components/VacationRequest';
import MainPage from "./components/MainPage";

import './custom.css'


export default () => (
    <Layout>
        <Route exact path='/' component={User} />
        <Route exact path='/MainPage' component={MainPage} />
        <Route exact path='/VacationRequest' component={VacationRequest} />
        <Route exact path='/Timer' component={TimerPage} />
    </Layout>
);
