import * as React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import{ VacationRequestState } from '../store/VacationRequest/types';
import '../style/VacationRequest.css';
import { actionCreators } from '../store/VacationRequest/actions';
import { RequestsTable } from './RequestsTable';
import { strict } from 'assert';
import { Data } from 'popper.js';

type VacationRequestProps =
    VacationRequestState &
    typeof actionCreators &
    RouteComponentProps<{}>;

   
    var requests = [
        { 	
            id: 1,
            startDate: new Date('2021-04-15'), 
            finishDate: new Date('2021-04-25'),
            status: 'Declined. Declined by PM. Declined by TL.',
            comment: 'I want to see a bober.',
            editable: false
        },
        { 	
            id: 2,
            startDate: new Date('2021-04-25'), 
            finishDate: new Date('2021-04-30'),
            status: 'Declined. Declined by PM. Declined by TL.',
            comment: 'I really want to see a bober.',
            editable: false
        },
        { 	
            id: 3,
            startDate: new Date('2021-05-01'), 
            finishDate: new Date('2021-05-10'),
            status: 'Pending consideration...',
            comment: 'Please, it`s my dream to see a bober.',
            editable: true
        }
    ];

const VacationRequest: React.FunctionComponent<VacationRequestProps> = ( props: any ) => {

    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());

    useEffect(
        () => {
            countAmount();
    }); 

    const validateDate = () => {
        if (startDate.getDate() && finishDate.getDate() && startDate.getDate() < finishDate.getDate()) {
            return { startDate, finishDate }        
        }
        return null
    }

    const countAmount = () => {
        var daysLag = 'Incorrect date!';
        let date = validateDate();
        if(date)
            daysLag = (Math.ceil(Math.abs(date.finishDate.getTime() - date.startDate.getTime()) / (1000 * 3600 * 24))).toString();
        (document.getElementById('amount') as HTMLInputElement).value = daysLag;
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let date = validateDate();
        if(date) {
            let startDate = date.startDate;
            let finishDate = date.finishDate;
            let comment = (document.getElementById('comment') as HTMLTextAreaElement).value;
            requests.push({id: requests[requests.length-1].id + 1, startDate, finishDate, status: 'Pending consideration...', comment, editable: true });
            console.log(requests);
            props.setHistory(requests);
            console.log(props.requestHistory);
        }
      }

    const componentDidMount = async () =>{
        props.checkUser();
        props.setHistory(requests);
    }

        if(props.logged){
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
                        <RequestsTable requests={props.requestHistory} />
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