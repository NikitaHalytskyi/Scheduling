import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import { UserState } from '../store/User/types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/MonthReport.css';



type MonthReportProps =
    UserState &
    RouteComponentProps<{}>;

class MonthReport extends React.PureComponent<MonthReportProps, { loading: boolean, comment: string}> {
    public state = {
        requests: [],
        loading: false,
        comment: ''
    }


    HandleExport() {
        alert("EXPORTED !)");
    }


    public render(){
        if(this.props.logged && this.props.token && this.props.user && this.props.user.computedProps.permissions.includes('Manager'))
            return (
                <React.Fragment>
                    <main>
                        <div id='mouth-selector'>
                            Employee select: 
                            <select>
                                <option value={'all'}>all</option>
                            </select>
                            <Calendar className={"calendar"} />
                        </div>
                        <div id='reports-container'>
                            <button onClick={this.HandleExport}>Export</button> 
                            <table>
                                <tr>
                                    <th>Employee</th>
                                    <th>Total work time</th>
                                    <th>Planned time</th>
                                    <th>Vacation</th>
                                </tr>
                                {console.log(this.state.requests)}
                                    <tr>
                                        <td>Employee</td>
                                        <td>Total work time</td>
                                        <td>Planned time</td>
                                        <td>Vacation</td>
                                    </tr>
                                
                            </table>
                        </div>
                    </main>
                </React.Fragment>
            );
        else
            return <Redirect to='/'/>
    }
}
export default connect(
    (state: ApplicationState) => state.loggedUser
)(MonthReport);