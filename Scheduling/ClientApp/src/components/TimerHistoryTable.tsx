import * as React from 'react';
import { TimerType } from '../store/Timer/types';
import '../style/RequestsTable.css';

type TableProps = {
    requests: Array<TimerType>
}

export const TimerHistoryTable: React.FunctionComponent<TableProps> = ({ requests }) => {
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
                                <td>{(new Date(r.startTime)).toLocaleTimeString()}-{(new Date(r.finishTime)).toLocaleTimeString()}</td>
                                <td>{r.Time}</td>

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