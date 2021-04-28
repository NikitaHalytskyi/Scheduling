import * as React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import{ VacationRequestState } from '../store/VacationRequest/types';
import '../style/VacationRequest.css';
import { actionCreators } from '../store/VacationRequest/actions';
import { RequestsTable } from './RequestsTable';
import { addUserRequest, getUserRequests, removeUserRequest } from '../webAPI/vacationRequest';
import { LoadingAnimation } from './Loading';
import { UserState } from '../store/User/types';
import { render } from 'react-dom';

type Request = {
	id: number,
	startDate: Date, 
	finishDate: Date,
	status: string,
	comment: string
}

type VacationPageProps =
    VacationRequestState &
    UserState &
    typeof actionCreators &
    RouteComponentProps<{}>;

class VacationRequest extends React.PureComponent<VacationPageProps, { startDate: Date, finishDate: Date, loading: boolean}> {
    public state = {
        startDate: new Date(),
        finishDate: new Date(),
        loading: false
    };

    // useEffect(() => {
    //     countAmount();
    // });

    async requestListUpdate() {
        let requests = [];
        this.setState({loading: true});
        if(this.props.token) {
            requests = await getUserRequests(this.props.token);
            if(requests !== undefined)
                this.props.setHistory(requests.data.getCurrentUserRequests);
        }
        this.setState({loading: false});
    }

    componentDidMount(){
        this.requestListUpdate();
    }
    // const fetchBusinesses = useCallback( () => {
    //     requestListUpdate();
    //   }, [])

    // useEffect(fetchBusinesses, [fetchBusinesses])

    validateDate() {
        let startDate = this.state.startDate;
        let finishDate = this.state.finishDate;
        if (startDate && finishDate && startDate < finishDate) {
            return { startDate, finishDate }        
        }
        return null
    }

    countAmount() {
        let daysLag = 'Incorrect date!';
        let output = document.getElementById('amount');
        let date = this.validateDate();
        if(date && output)
            daysLag = (Math.ceil(Math.abs(date.finishDate.getTime() - date.startDate.getTime()) / (1000 * 3600 * 24))).toString();
        if(output)
            output.textContent = daysLag;
    }

    componentDidUpdate(){
        this.countAmount();
    }

    async handleSubmit() {
        let date = this.validateDate();
        if(date && this.props.token) {
            this.setState({loading: true});
            let comment = (document.getElementById('comment') as HTMLTextAreaElement).value;
            let startDate = date.startDate;
            let finishDate = date.finishDate;
            let data = {startDate: startDate, finishDate: finishDate, comment};
            console.log(data);
            let newRequest = await addUserRequest(this.props.token, data);
            this.props.addVacationRequest(newRequest.data.addVacationRequest);
            //requestListUpdate();
            console.log(newRequest);
            console.log(this.props.requestHistory);
            this.setState({loading: false});
        }
    }



    // const requestListUpdateCallback = useCallback(
    //     () => {
    //         requestListUpdate()
    //     },
    //     [requestListUpdate],
    // )
    


    async removeRequest (id: number) {
        let requests = []
        if(this.props.token)
        {
            this.setState({loading: true});
            requests = await removeUserRequest(this.props.token, id);
            console.log('requests');
            console.log(requests.data.removeVacationRequest);
            if(requests !== undefined && requests.data.removeVacationRequest == true){
                this.props.removeVacationRequest(id);
                console.log(this.props.requestHistory);
            }
            this.setState({loading: false});
        }
    }

    public render(){
        if(this.state.loading)
            return (<LoadingAnimation/>);
        if(this.props.logged){
            console.log(this.props);
            return (
                <React.Fragment>
                    <main>
                        <div id='vacation-container'>
                            <form id='vacation-request'>
                                <h2>Vacation</h2>
                                <div className='line-container'>
                                    <div className='data-container'>
                                        <label htmlFor='start-date'>From</label>
                                        <input type='date' id='start-date' onInput={(event) => this.setState({startDate: new Date(event.currentTarget.value)})}></input>
                                    </div>
                                    <div className='data-container'>
                                        <label htmlFor='finish-date'>To</label>
                                        <input type='date' id='finish-date'onInput={(event) => this.setState({finishDate: new Date(event.currentTarget.value)})}></input>
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
                                <button id='send-request' type='button' onClick={()=> this.handleSubmit()}>Request vacation</button>
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
                        <RequestsTable requests={this.props.requestHistory} removeRequest={async (id: number) => await this.removeRequest(id)}/>
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
    (state: ApplicationState) => ({...state.loggedUser, ...state.vacationRequest}),
    actionCreators
)(VacationRequest);