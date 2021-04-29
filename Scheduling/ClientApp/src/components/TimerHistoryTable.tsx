import Cookies from 'js-cookie';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/configureStore';
import { actionCreators } from '../store/Timer/actions';
import { TimerType } from '../store/Timer/types';
import '../style/RequestsTable.css';
import { deleteTimer, getUserTimerData } from '../webAPI/timer';
import Popup from './Popup';

type TableProps = {
    requests: Array<TimerType>
}

class TimerHistoryTable extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false,
            editId: 0,
            startTime: new Date(),
            finishTime: new Date(),
            buttonText: "",
        };
    }
    async componentDidMount() {
        const token = Cookies.get('token');
        if (token) {
            const data = await getUserTimerData(token);
        }
        console.log(this.props.timerHistory);
    }
    async deleteTimerValue(id: number){
        const token = Cookies.get('token');
        const data = await deleteTimer(token, id);

        if (data.data) {
            this.props.deleteTime(data.data.deleteTimerFinishValue.id);
        }
    }
    convertMiliseconds(finishTime, startTime) {
        if (finishTime == null) {
            return ""
        }
        var millis = new Date(finishTime) - new Date(startTime);
        var minutes;
        var hours;
        minutes = Math.floor((millis / (1000 * 60)) % 60);
        hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        return hours + ":" + minutes ;
    }
    togglePopup(id, startTime, finishTime) {
        this.setState({
            showPopup: !this.state.showPopup,
            editId: id,
            startTime: startTime,
            finishTime: finishTime,
        });
    }
    convertDateToHoursMinutes(time) {
        var hours = new Date(time).getHours();
        hours = (hours < 10) ? "0" + hours : hours;
        var minutes = new Date(time).getMinutes();
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        return (hours + ":" + minutes);
    }
    changePopUpButtonText(text) {
        this.setState({
            buttonText: text
        })
    }
    render() {
        if (this.props.timerHistory != undefined && this.props.timerHistory.length > 0) {
            console.log('table' + this.props.timerHistory[0].id);
            return (
                <React.Fragment>
                    <div id='vacation-history'>
                        <h5>Vacation history</h5>
                        <table id='history'>
                            <tbody>
                                <tr>
                                    <th>Interval</th>
                                    <th>Time(h:m)</th>
                                    <th></th>
                                </tr>
                                {this.props.timerHistory.map((r) => <tr key={this.props.timerHistory.indexOf(r)}>
                                    <td>{(new Date(r.startTime)).toLocaleTimeString()}-{(r.finishTime == null ? "still in action" : (new Date(r.finishTime)).toLocaleTimeString())}</td>
                                    <td>{
                                        this.convertMiliseconds(r.finishTime,r.startTime)
                                    }</td>
                                    <td>
                                        <button onClick={() => {
                                            this.togglePopup(r.id, r.startTime, r.finishTime)
                                            this.changePopUpButtonText("Edit")
                                        }}>Edit</button>
                                        <button onClick={() => {
                                        this.deleteTimerValue(r.id)
                                    }}>Delete</button>
                                    </td>

                                </tr>)}
                                {this.state.showPopup ?
                                    <Popup
                                        closePopup={this.togglePopup.bind(this)}
                                        id={this.state.editId}
                                        startTime={this.convertDateToHoursMinutes(this.state.startTime)}
                                        finishTime={this.convertDateToHoursMinutes(this.state.finishTime)}
                                        buttonText={this.state.buttonText}
                                    />
                                    : null
                                }
                            </tbody>
                            <button>Add new item</button>

                        </table>
                    </div>
                </React.Fragment>)
        }
        else {
            return (
                <React.Fragment>
                    <div id='vacation-history'>
                        <h5>Timer history</h5>
                        <table id='history'>
                            <tbody>
                                <tr>
                                    <th>Interval</th>
                                    <th>Time</th>
                                    <th></th>
                                </tr>
                                <button id='send-request'>Add new item</button>
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>)
        }
    }
}
export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(TimerHistoryTable);


