import Cookies from 'js-cookie';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/configureStore';
import { actionCreators } from '../store/Timer/actions';
import { TimerType } from '../store/Timer/types';
import '../style/RequestsTable.css';
import { deleteTimer, getUserTimerData } from '../webAPI/timer';

type TableProps = {
    requests: Array<TimerType>
}



class TimerHistoryTable extends Component {
    async componentDidMount() {
        const token = Cookies.get('token');
        if (token) {
            const data = await getUserTimerData(token);
        }
        console.log(this.props.timerHistory);
    }
    async deleteTimerValue(id: number){
        const token = Cookies.get('token');
        const data = await deleteTimer(token, id);

        if (data.data) {
            this.props.deleteTime(data.data.deleteTimerFinishValue.id);
        }
    }
    render() {
        if (this.props.timerHistory != undefined && this.props.timerHistory.length > 0) {
            console.log('table' + this.props.timerHistory[0].id);
            return (
                <React.Fragment>
                    <div id='vacation-history'>
                        <h5>Vacation history</h5>
                        <table id='history'>
                            <tbody>
                                <tr>
                                    <th>Interval</th>
                                    <th>Time</th>
                                    <th></th>
                                </tr>
                                {this.props.timerHistory.map((r) => <tr key={this.props.timerHistory.indexOf(r)}>
                                    <td>{(new Date(r.startTime)).toLocaleTimeString()}-{(r.finishTime == null ? "still in action" : (new Date(r.finishTime)).toLocaleTimeString())}</td>
                                    <td>{r.Time}</td>
                                    <td><button onClick={() => {
                                        this.deleteTimerValue(r.id)
                                    }}>Delete</button></td>

                                </tr>)}
                            </tbody>
                            <button id='send-request'>Add new item</button>

                        </table>
                    </div>
                </React.Fragment>)
        }
        else {
            return (
                <React.Fragment>
                    <div id='vacation-history'>
                        <h5>Timer history</h5>
                        <table id='history'>
                            <tbody>
                                <tr>
                                    <th>Interval</th>
                                    <th>Time</th>
                                    <th></th>
                                </tr>
                                <button id='send-request'>Add new item</button>
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>)
        }
    }
}
export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(TimerHistoryTable);


