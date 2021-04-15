import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import{ VacationRequestState } from '../store/VacationRequest/types';
import '../style/VacationRequest.css';
import { actionCreators } from '../store/VacationRequest/actions';
import { RequestsTable } from './RequestsTable';

type VacationRequestProps =
    VacationRequestState &
    typeof actionCreators &
    RouteComponentProps<{}>;

   
    const requests = [
        { 	
            startDate: new Date('2021-04-15'), 
            finishDate: new Date('2021-04-25'),
            status: 'Declined. Declined by PM. Declined by TL.',
            comment: 'I want to see a bober.',
            editable: false
        },
        { 	
            startDate: new Date('2021-04-25'), 
            finishDate: new Date('2021-04-30'),
            status: 'Declined. Declined by PM. Declined by TL.',
            comment: 'I really want to see a bober.',
            editable: false
        },
        { 	
            startDate: new Date('2021-05-01'), 
            finishDate: new Date('2021-05-10'),
            status: 'Pending consideration...',
            comment: 'Please, it`s my dream to see a bober.',
            editable: true
        }
    ];

class VacationRequest extends React.PureComponent<VacationRequestProps>{

    async componentDidMount(){
        this.props.checkUser();
        console.log(requests);
        this.props.setHistory(requests);
    }

    public render(){
        if(this.props.logged){
            return (
                <React.Fragment>
                    <main>
                        <div id='vacation-container'>
                            <form id='vacation-request'>
                                <h2>Vacation</h2>
                                <div className='line-container'>
                                    <div className='data-container'>
                                        <label htmlFor='start-date'>From</label>
                                        <input type='date' id='start-date'></input>
                                    </div>
                                    <div className='data-container'>
                                        <label htmlFor='finish-date'>To</label>
                                        <input type='date' id='finish-date'></input>
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
                                <button id='send-request' type='button'>Request vacation</button>
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
                        <RequestsTable requests={this.props.requestHistory} />
                    </main>
                </React.Fragment>
            );
        }
        else{
            return <Redirect to='/'  />
        }
        
    }
};

export default connect(
    (state: ApplicationState) => state.vacationRequest,
    actionCreators
)(VacationRequest);