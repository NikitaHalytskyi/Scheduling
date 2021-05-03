import Cookies from 'js-cookie';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/configureStore';
import { actionCreators } from '../store/Timer/actions';
import { TimerType } from '../store/Timer/types';
import '../style/RequestsTable.css';
import { deleteTimer, addTimerValue, getUserTimerData, getUserTimerDataDate, editTimerValue } from '../webAPI/timer';

type TableProps = {
    requests: Array<TimerType>
}

class Popup extends React.Component {
    constructor() {
        super();
        this.state = {
            startTime: new Date(new Date().setHours(0, 0, 0, 0)),
            finishTime: new Date(new Date().setHours(0, 0, 0, 0)),
            showWarning: false,
        };
        this.convertDateToHoursMinutesStart = this.convertDateToHoursMinutesStart.bind(this);

    }
    componentDidMount() {
        if (this.props.buttonText == "Edit") {
            this.setFinishTime(new Date(this.props.finishTime));
            this.setStartTime(new Date(this.props.startTime));
        }
    }
    async deleteTimerValue(id: number) {
        const token = Cookies.get('token');
        const data = await deleteTimer(token, id);

        if (data.data) {
            this.props.deleteTime(data.data.deleteTimerFinishValue.id);
        }
    }
    handleChangeStartTime = (e) => {
        var a = new Date(this.state.startTime);
        a.setHours(e.target.value.split(":")[0])
        a.setMinutes(e.target.value.split(":")[1]);
        a.setSeconds(0);
        this.setStartTime(a);
    };
    handleChangeFinishTime = (e) => {
        var a = new Date(this.state.finishTime);
        a.setHours(e.target.value.split(":")[0])
        a.setMinutes(e.target.value.split(":")[1]);
        a.setSeconds(0);
        this.setFinishTime(a);
    };
    setStartTime(time) {
        if (time < this.state.finishTime)
            this.setState({
                startTime: time,
                showWarning: false,
            });
        else {
            this.setState({
                showWarning: true,
                startTime: time,
            });
            console.log("loh")
        }
    }
    setFinishTime(time) {
        if(time > this.state.startTime)
        this.setState({
            finishTime: time,
            showWarning: false,
        });
        else {
            this.setState({
                showWarning: true,
                finishTime: time,
            });
            console.log("loh")
        }
    }
    convertDateToHoursMinutesStart(time) {
        var hours = new Date(time).getHours();
        hours = (hours < 10) ? "0" + hours : hours;
        var minutes = new Date(time).getMinutes();
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        return (hours + ":" + minutes);
    }
    async addValue(startTimeArg: Date, finishTimeArg: Date) {
        if (finishTimeArg > startTimeArg) {
            var startTime = new Date(this.props.timerHistory[0].startTime);
            startTime.setHours(startTimeArg.getHours());
            startTime.setMinutes(startTimeArg.getMinutes());
            var finishTime = new Date(this.props.timerHistory[0].finishTime);
            finishTime.setHours(finishTimeArg.getHours());
            finishTime.setMinutes(finishTimeArg.getMinutes());


            const token = Cookies.get('token');
            if (token) {
                const data = await addTimerValue(token, startTime.toISOString(), finishTime.toISOString());
            }

            this.changeDate(startTime);
        }
        else {
            console.log("loh")
        }
    }
    async editValue(startTimeArg: Date, finishTimeArg: Date, id: number) {
        if (finishTimeArg > startTimeArg) {
            var startTime = new Date(this.props.timerHistory[0].startTime);
            startTime.setHours(startTimeArg.getHours());
            startTime.setMinutes(startTimeArg.getMinutes());
            var finishTime = new Date(this.props.timerHistory[0].finishTime);
            finishTime.setHours(finishTimeArg.getHours());
            finishTime.setMinutes(finishTimeArg.getMinutes());


            const token = Cookies.get('token');
            if (token) {
                const data = await editTimerValue(token, startTime.toISOString(), finishTime.toISOString(), id);
            }

            this.changeDate(startTime);
        }
        else {
            console.log("loh")
        }
    }
    getConvertedDate(date: Date) {
        var today = date;
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return (today);
    }
    async changeDate(date) {
        const token = Cookies.get('token');
        if (token) {
            const data = await getUserTimerDataDate(token, this.getConvertedDate(date));

            let currentDate = data.data.getCurrentUser.computedProps.timerHistories.sort((a: { startTime: Date; }, b: { startTime: Date; }) => new Date(a.startTime) - new Date(b.startTime));

            this.props.setTimerHistory(currentDate);
        }
    }
    render() {
        const closeButton = {
            top: "0px",
            right: "0px",
            position: "absolute",
        };
        const popup = {
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)"
    };

    const popup_inner = {
        position: "absolute",
        left: "40%",
        right: "40%",
        top: "40%",
        bottom: "40%",
        margin: "auto",
        backgroundColor: "white",
        padding: "2vw"
        };
        const timeInput = {
            margin: "5px",
        };
        if (this.props.buttonText == "Edit")
        return (
            <div style={popup} onClick={proxy => proxy.stopPropagation() } >
                <div style={popup_inner}>
                    <h6>{this.props.buttonText}</h6>
                    <input type="time" value={this.convertDateToHoursMinutesStart(this.state.startTime)} onChange={this.handleChangeStartTime} style={timeInput} />
                    -
                    <input type="time" value={this.convertDateToHoursMinutesStart(this.state.finishTime)} style={timeInput} onChange={this.handleChangeFinishTime} />
                    <button onClick={(e) => { this.editValue(this.state.startTime, this.state.finishTime, this.props.editId); this.props.closePopup() }}>{this.props.buttonText}</button>
                    <button onClick={this.props.closePopup}  style={closeButton}>Close</button>
                    <button onClick={() => {
                        this.deleteTimerValue(this.props.id)
                    }}>Delete</button>
                    {this.state.showWarning ?
                        <h6>finish time must be greater than start time</h6>
                        : null
                    }
                </div>
            </div>
            );
        else
            return (
                <div style={popup} onClick={proxy => proxy.stopPropagation()} >
                    <div style={popup_inner}>
                        <h6>{this.props.buttonText}</h6>
                    <input type="time" value={this.convertDateToHoursMinutesStart(this.state.startTime)} onChange={this.handleChangeStartTime} style={timeInput} />
                    -
                    <input type="time" min={this.convertDateToHoursMinutesStart(this.state.startTime)} value={this.convertDateToHoursMinutesStart(this.state.finishTime)} style={timeInput} onChange={this.handleChangeFinishTime} />
                        <button onClick={(e) => { this.addValue(this.state.startTime, this.state.finishTime); this.props.closePopup() }}>{this.props.buttonText}</button>
                        <button onClick={this.props.closePopup} style={closeButton}>Close</button>
                        {this.state.showWarning ?
                            <h6>finish time must be greater than start time</h6>
                            : null
                        }
                    </div>
                </div>
            );
    }
}


export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(Popup);


