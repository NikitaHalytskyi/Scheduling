import * as React from 'react';
import { Button } from 'reactstrap';
import { VacationRequest } from '../store/VacationRequest/types';
import '../style/VacationApprovingTable.css';
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


export const VacationApprovingTable: React.FunctionComponent<TableProps> = ({ loading, requests }) => {

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
                                    <td>{convertDate(r.startDate)}-{convertDate(r.finishDate)}</td>
                                    <td>{r.name}</td>
                                    <td>{r.comment}</td>
                                    <td><textarea className={"my-comment"}/></td>
                                <td className={"align-center"}><button type='button' className={"button-vacation-agree"}><span>&#10003;</span></button><button type='button' className={"button-vacation-disagree"}>X</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {loading? <div className='overflow-loading'><LoadingAnimation/></div>: null}
            </div>
        </React.Fragment>
    );
}