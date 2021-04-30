import * as React from 'react';
import '../style/VacationApprovingTable.css';
import { LoadingAnimation } from './Loading';
import { ApprovingLine } from './VacationApprovingTableLine';

type TableProps = {
    token: string,
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


export const VacationApprovingTable: React.FunctionComponent<TableProps> = ({ token, loading, requests }) => {

    if(requests.length > 0)
        console.log('table' + requests[0].comment);
    return (
        <React.Fragment>
            <div id='vacation-approving'>
                <h5 className={loading? 'blured': ''}>Vacation requests</h5>
                <table id='approving' className={loading? 'blured': ''}>
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>User comment</th>
                            <th>My comment</th>
                            <th>My respons</th>
                        </tr>
                        {requests.filter(r => r.status === "Pending consideration...").map((r) =>
                            <tr key={requests.indexOf(r)}>
                                <ApprovingLine token={token} request={r}/>
                            </tr>
                        )}
                    </tbody>
                </table>
                {loading? <div className='overflow-loading'><LoadingAnimation/></div>: null}
            </div>
        </React.Fragment>
    );
}