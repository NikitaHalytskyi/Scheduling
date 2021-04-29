import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import { actionCreators } from '../store/VacationRequest/actions';
import { UserState } from '../store/User/types';
import { getAllRequests } from '../webAPI/vacationApproving';
import { VacationRequest } from '../store/VacationRequest/types';
import { LoadingAnimation } from './Loading';
import { AllRequestsTable } from './AllRequestsTable';

type ApprovingRequest = {
    id: number,
    startDate: Date,
    finishDate: Date,
    name: string,
    status: string,
    comment: string
}

type VacationApprovingProps =
    UserState &
    typeof actionCreators &
    RouteComponentProps<{}>;

class VacationApproving extends React.PureComponent<VacationApprovingProps, { requests: Array<ApprovingRequest>, loading: boolean, comment: string}> {
    public state = {
        requests: [],
        loading: false,
        comment: ''
    }

    getUserName(users: Array<{id: number, name: string, surname: string}>, id: number){
        let user = users.find(u => u.id === id);
        console.log(users, id)
        if(user)
            return user.name + ' ' + user.surname;
        return '';
    }
    
    async requestListUpdate() {
        this.setState({loading: true});
        if(this.props.token) {
            let data = await getAllRequests(this.props.token);
            if(data !== undefined) {
                let requests: { id: number; startDate: Date; finishDate: Date; name: string; status: string; comment: string; }[] = [];
                console.log(data);
                data.data.getAllVacationRequests.forEach((request: VacationRequest) => {
                    requests.push({ 
                        id: request.id, 
                        startDate: request.startDate, 
                        finishDate: request.finishDate, 
                        name: this.getUserName(data.data.getAllUsers, request.userId),
                        status: request.status,
                        comment: request.comment
                    });
                });
                this.setState({requests: requests});
                console.log(this.state);
            }
        }
        this.setState({loading: false});
    }

    componentDidMount(){
        this.requestListUpdate();
    }

    convertDate(date: Date) {
        let dateObj = new Date(date);
        let month = dateObj.getUTCMonth() + 1;
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return (year + "." + month + "." + day);
    }

    public render(){
        if(this.props.logged)
            return (
                <React.Fragment>
                    <main>
                        <div id='approving-container'>
                            <h2>Vacation approving</h2>

                            <h4>Vacation requests</h4>
                            <AllRequestsTable loading={this.state.loading} requests={this.state.requests}/>
                        </div>
                    </main>
                </React.Fragment>
            );
        else
            return <Redirect to='/'/>
    }
}
export default connect(
    (state: ApplicationState) => state.loggedUser,
    actionCreators
)(VacationApproving);