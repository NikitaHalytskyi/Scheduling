import * as React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import { TimerHistoryState } from '../store/Timer/types';
import '../style/VacationRequest.css';
import { actionCreators } from '../store/Timer/actions';
import { useState } from 'react';
import { TimerHistoryTable } from './TimerHistoryTable';
import Timer from "./timer"
import Cookies from 'js-cookie';
import { getUserTimerData } from '../webAPI/timer';
type TimerHistoryProps =
    TimerHistoryState &
    typeof actionCreators &
    RouteComponentProps<{}>;

   
const DatePanel = () => {
    const [startDate, setStartDate] = useState(new Date());


    return (
        <DatePicker
            selected={startDate}
            onChange={date => {
                setStartDate(date);

                function getConvertedDate(date) {
                    var today = date;
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();

                    today = yyyy + '-' + mm + '-' + dd;
                    console.log(today);
                }

                getConvertedDate(date);
            }}
            filterDate={(date) => {
                return new Date() > date;
            }}

            inline
        />
    );
}
class TimerPage extends React.PureComponent<TimerHistoryProps>{
    handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
      }

    async componentDidMount() {
        console.log(this.props);
        const token = Cookies.get('token');
        if (token) {
            const data = await getUserTimerData(token);

            if (data.data) {
                this.props.setTimerHistory(data.data.getCurrentUser.computedProps.timerHistories);
                console.log(this.props.timerHistory);
                console.log(this.props);
            }
        }
        //this.props.addTime(new Date().toLocaleTimeString());

    }

    public render(){
        if(this.props.logged){
            return (
                <React.Fragment>
                    <main>
                        <h2>Timer</h2>
                        <div id='vacation-container'>
                            <TimerHistoryTable requests={this.props.timerHistory} />
                            <DatePanel />
                            <div id='vacation-info'>
                                <div className='time-tracker'>
                                    <h5>Time tracker</h5>
                                    <Timer  />
                                </div>
                            </div>
                        </div>
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
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(TimerPage);