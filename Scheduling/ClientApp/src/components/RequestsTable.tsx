import * as React from 'react';
import { VacationRequest } from '../store/VacationRequest/types';
import '../style/RequestsTable.css';
import { LoadingAnimation } from './Loading';

type TableProps = {
    requests: Array<VacationRequest>
    removeRequest: Function
    loading: Boolean
}

export const RequestsTable: React.FunctionComponent<TableProps> = ({ loading, requests, removeRequest }) => {

    const convertDate = (date: Date) => {
        let dateObj = new Date(date);
        let month = dateObj.getUTCMonth() + 1;
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return (year + "." + month + "." + day);
    }

    if(requests.length > 0)
        console.log('table' + requests[0].comment);
    return (
        <React.Fragment>
            <div id='vacation-history'>
                <h5 className={loading? 'blured': ''}>Vacation history</h5>
                <table id='history' className={loading? 'blured': ''}>
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
                {loading? <div className='overflow-loading'><LoadingAnimation/></div>: null}
            </div>
        </React.Fragment>
    );
}