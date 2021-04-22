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
import { LoadingAnimation } from './Loading';

type VacationRequestProps =
    VacationRequestState &
    typeof actionCreators &
    RouteComponentProps<{}>;

const VacationRequest: React.FunctionComponent<VacationRequestProps> = ( props: VacationRequestProps ) => {

    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        countAmount();
    });

    useEffect(() => {
        requestListUpdate();
    }, []); 


    const validateDate = () => {
        if (startDate && finishDate && startDate < finishDate) {
            return { startDate, finishDate }        
        }
        return null
    }

    const countAmount = () => {
        let daysLag = 'Incorrect date!';
        let output = document.getElementById('amount');
        let date = validateDate();
        if(date && output)
            daysLag = (Math.ceil(Math.abs(date.finishDate.getTime() - date.startDate.getTime()) / (1000 * 3600 * 24))).toString();
        if(output)
            output.textContent = daysLag;
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let date = validateDate();
        if(date && props.token) {
            toggleLoading(true);
            let comment = (document.getElementById('comment') as HTMLTextAreaElement).value;
            let startDate = date.startDate;
            let finishDate = date.finishDate;
            let data = {startDate: startDate, finishDate: finishDate, comment};
            console.log(data);
            let requests = await addUserRequest(props.token, data);
            props.setHistory(requests);
            requestListUpdate();
            console.log(requests);
            toggleLoading(false);
        }
    }

    const requestListUpdate = async () => {
        let requests = [];
        console.log(props.token);
        props.checkUser();
        console.log(props.token);
        toggleLoading(true);
        if(props.token) {
            console.log('send ' + props.token);
            requests = await getUserRequests(props.token);
            console.log('get requests' + requests);
            if(requests != undefined)
                props.setHistory(requests.data.getCurrentUserRequests);

        }
        toggleLoading(false);
    }

    const removeRequest = async (id: number) => {
        let requests = []
        if(props.token)
        {
            toggleLoading(true);
            requests = await removeUserRequest(props.token, id);
        if(requests != undefined)
            props.setHistory(requests.data.removeVacationRequest);
            toggleLoading(false);
        }
    }


    if(loading)
        return (<LoadingAnimation/>);
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
                                <p id='amount'></p>
                            </div>
                            <div className='data-container'>
                                <label htmlFor='comment'>Comment</label>
                                <textarea id='comment'></textarea>
                            </div>
                            <button id='send-request' type='button' onClick={handleSubmit}>Request vacation</button>
                        </form>
                        <div id='vacation-info'>
                            <div className='avaible-time'>
                                <h5>Available vacation time</h5>
                                <p id='avaible-time'>0 days</p>
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