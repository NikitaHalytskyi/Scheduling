import * as React from 'react';
import '../style/RequestsTable.css';
import { LoadingAnimation } from './Loading';

type TableProps = {
    requests: Array<{
        id: number,
        startDate: Date,
        finishDate: Date,
        name: string,
        status: string,
        comment: string
    }>
    loading: Boolean
}

export const AllRequestsTable: React.FunctionComponent<TableProps> = ({ loading, requests }) => {

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
                <h5 className={loading? 'blured': ''}>Response history</h5>
                <table id='history' className={loading? 'blured': ''}>
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Comment</th>
                        </tr>
                        {requests.map((r) => <tr key={requests.indexOf(r)}>
                            <td>{convertDate(r.startDate)}-{convertDate(r.finishDate)}</td>
                            <td>{r.name}</td>
                            <td>{r.status}</td>
                            <td>{r.comment}</td>
                        </tr>)}
                    </tbody>
                </table>
                {loading? <div className='overflow-loading'><LoadingAnimation/></div>: null}
            </div>
        </React.Fragment>
    );
}