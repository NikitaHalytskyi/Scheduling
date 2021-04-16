import * as React from 'react';
import { VacationRequest } from '../store/VacationRequest/types';
import '../style/RequestsTable.css';

type TableProps = {
    requests: Array<VacationRequest>
}

export const RequestsTable: React.FunctionComponent<TableProps> = ({ requests }) => {
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
                            <td>{(r.startDate).toDateString()}-{r.finishDate.toDateString()}</td>
                            <td>{r.status}</td>
                            <td>{r.comment}</td>
                            <td><button disabled={!r.editable}>Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}