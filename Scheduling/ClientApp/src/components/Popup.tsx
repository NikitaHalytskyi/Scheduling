import Cookies from 'js-cookie';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/configureStore';
import { actionCreators } from '../store/Timer/actions';
import { TimerType } from '../store/Timer/types';
import '../style/RequestsTable.css';
import { deleteTimer, getUserTimerData } from '../webAPI/timer';

type TableProps = {
    requests: Array<TimerType>
}

class Popup extends React.Component {
    async deleteTimerValue(id: number) {
        const token = Cookies.get('token');
        const data = await deleteTimer(token, id);

        if (data.data) {
            this.props.deleteTime(data.data.deleteTimerFinishValue.id);
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
        return (
            <div style={popup} onClick={proxy => proxy.stopPropagation() } >
                <div style={popup_inner}>
                    <h6>{this.props.buttonText}</h6>
                    <input type="time" value={this.props.startTime} style={timeInput} />
                    -
                    <input type="time" value={this.props.finishTime} style={timeInput}/>
                    <button onClick={this.props.closePopup}>{this.props.buttonText}</button>
                    <button onClick={this.props.closePopup} style={closeButton}>Close</button>
                    <button onClick={() => {
                        this.deleteTimerValue(this.props.id)
                    }}>Delete</button>
                </div>
            </div>
        );
    }
}


export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(Popup);


