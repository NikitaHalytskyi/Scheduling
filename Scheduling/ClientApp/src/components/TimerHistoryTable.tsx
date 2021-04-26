import Cookies from 'js-cookie';
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/configureStore';
import { actionCreators } from '../store/Timer/actions';
import { TimerType } from '../store/Timer/types';
import '../style/RequestsTable.css';
import { deleteTimer } from '../webAPI/timer';

type TableProps = {
    requests: Array<TimerType>
}



export const TimerHistoryTable: React.FunctionComponent<TableProps> = ({ requests }) => {
    const deleteTimerValue = (id: number) => {
        const token = Cookies.get('token');
        const data = deleteTimer(token, id);
    }

    if (requests != undefined && requests.length > 0) {
        console.log('table' + requests[0].id);
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
                            {requests.map((r) => <tr key={requests.indexOf(r)}>
                                <td>{(new Date(r.startTime)).toLocaleTimeString()}-{(r.finishTime == null ? "still in action" : (new Date(r.finishTime)).toLocaleTimeString())}</td>
                                <td>{r.Time}</td>
                                <td><button onClick={() => {
                                    deleteTimerValue(r.id)
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
export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(TimerHistoryTable);


