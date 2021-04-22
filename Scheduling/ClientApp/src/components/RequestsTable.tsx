import * as React from 'react';
import { VacationRequest } from '../store/VacationRequest/types';
import '../style/RequestsTable.css';

type TableProps = {
    requests: Array<VacationRequest>
    removeRequest: Function
}

export const RequestsTable: React.FunctionComponent<TableProps> = ({ requests, removeRequest }) => {

    const convertDate = (date: Date) => {
        let dateObj = new Date(date);
        let month = dateObj.getUTCMonth() + 1;
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return (year + "." + month + "." + day);
    }

    if(requests.length>0)
        console.log('table' + requests[0].comment);
    return (
        <React.Fragment>
            <div id='vacation-history'>
                <h5>Vacation history</h5>
                <table id='history'>
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Comment</th>
                            <th></th>
                        </tr>
                        {requests.map((r) => <tr key={requests.indexOf(r)}>
                            <td>{convertDate(r.startDate)}-{convertDate(r.finishDate)}</td>
                            <td>{r.status}</td>
                            <td>{r.comment}</td>
                            <td><button onClick={() => removeRequest(r.id)}>Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}