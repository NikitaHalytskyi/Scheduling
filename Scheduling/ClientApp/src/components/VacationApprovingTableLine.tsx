import * as React from 'react';
import { useState } from 'react';
import { considerVacationRequest } from '../webAPI/vacationApproving';

type LineProps = {
    token: string,
    request: {
        id: number,
        startDate: Date,
        finishDate: Date,
        name: string,
        status: string,
        comment: string
    },
}


export const ApprovingLine: React.FunctionComponent<LineProps> = ({ token, request }) => {
    
  const [comment, setComment] = useState("");

  const convertDate = (date: Date) => {
    let dateObj = new Date(date);
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    return (year + "." + month + "." + day);
}

  const handleSubmit = async (reaction: string) => {
      let reac = reaction === 'true'? true : false;
      let res = await considerVacationRequest(token, request.id, reac, comment);
      request = res;
    }

    return (
        <React.Fragment>
            <td>{convertDate(request.startDate)}-{convertDate(request.finishDate)}</td>
            <td>{request.name}</td>
            <td>{request.comment}</td>
            <td><textarea className={"my-comment"} onInput={event => setComment(event.currentTarget.value)}/></td>
            <td className={"align-center"}>
                <button type='button' value='true' className={"button-vacation-agree"} onClick={event => handleSubmit(event.currentTarget.value)}>
                    <span>&#10003;</span>
                </button>
                <button type='button' className={"button-vacation-disagree"} onClick={event => handleSubmit(event.currentTarget.value)}>X</button>
            </td>
        </React.Fragment>
    );
}