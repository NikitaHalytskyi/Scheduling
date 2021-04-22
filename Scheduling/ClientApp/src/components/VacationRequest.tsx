import * as React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import{ VacationRequestState } from '../store/VacationRequest/types';
import '../style/VacationRequest.css';
import { actionCreators } from '../store/VacationRequest/actions';
import { RequestsTable } from './RequestsTable';
import { addUserRequest, getUserRequests, removeUserRequest } from '../webAPI/vacationRequest';

type VacationRequestProps =
    VacationRequestState &
    typeof actionCreators &
    RouteComponentProps<{}>;

const VacationRequest: React.FunctionComponent<VacationRequestProps> = ( props: VacationRequestProps ) => {

    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());

    useEffect(() => {
        countAmount();
    });

    useEffect(() => {
        requestListUpdate();
    }, []); 

    const validateDate = () => {
        if (startDate.toDateString() && finishDate.toDateString() && startDate.toDateString() < finishDate.toDateString()) {
            return { startDate, finishDate }        
        }
        return null
    }

    const countAmount = () => {
        let daysLag = 'Incorrect date!';
        let output = document.getElementById('amount') as HTMLInputElement;
        let date = validateDate();
        if(date && output)
            daysLag = (Math.ceil(Math.abs(date.finishDate.getTime() - date.startDate.getTime()) / (1000 * 3600 * 24))).toString();
        if(output)
            output.value = daysLag;
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let date = validateDate();
        if(date && props.token) {
            let comment = (document.getElementById('comment') as HTMLTextAreaElement).value;
            let startDate = date.startDate;
            let finishDate = date.finishDate;
            let data = {startDate: startDate, finishDate: finishDate, comment};
            console.log(data);
            let requests = await addUserRequest(props.token, data);
            props.setHistory(requests);
            console.log(requests);
        }
    }

    const requestListUpdate = async () => {
        let requests = []
        if(props.token)
            requests = await getUserRequests(props.token);
        props.checkUser();
        props.setHistory(requests.data.getCurrentUserRequests);
    }

    const removeRequest = async (id: number) => {
        let requests = []
        if(props.token)
            requests = await removeUserRequest(props.token, id);
        props.setHistory(requests.data.removeVacationRequest);
    }


    if(props.logged){
        console.log('render');
        return (
            <React.Fragment>
                <main>
                    <div id='vacation-container'>
                        <form id='vacation-request'>
                            <h2>Vacation</h2>
                            <div className='line-container'>
                                <div className='data-container'>
                                    <label htmlFor='start-date'>From</label>
                                    <input type='date' id='start-date' onInput={event =>  setStartDate(new Date(event.currentTarget.value))}></input>
                                </div>
                                <div className='data-container'>
                                    <label htmlFor='finish-date'>To</label>
                                    <input type='date' id='finish-date' onInput={event => setFinishDate(new Date(event.currentTarget.value))}></input>
                                </div>
                            </div>
                            <div className='data-container'>
                                <label htmlFor='amount'>Amount</label>
                                <input id='amount' readOnly></input>
                            </div>
                            <div className='data-container'>
                                <label htmlFor='comment'>Comment</label>
                                <textarea id='comment'></textarea>
                            </div>
                            <button id='send-request' type='button' onClick={handleSubmit}>Request vacation</button>
                        </form>
                        <div id='vacation-info'>
                            <div className='avaible-time'>
                                <h5>Avaible vacation time</h5>
                                <p id='avaible-time'>0.00 days</p>
                            </div>
                            <div className='time-tracker'>
                                <h5>Time tracker</h5>
                            </div>
                        </div>
                    </div>
                    <RequestsTable requests={props.requestHistory} removeRequest={removeRequest}/>
                </main>
            </React.Fragment>
        );
    }
    else{
        return <Redirect to='/'  />
    }  
};

export default connect(
    (state: ApplicationState) => state.vacationRequest,
    actionCreators
)(VacationRequest);