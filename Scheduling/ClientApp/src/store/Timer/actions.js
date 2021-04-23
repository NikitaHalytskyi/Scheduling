"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = void 0;
var setTimerHistory = function (requests) { return ({ type: 'SET_TIMERHISTORY', requests: requests }); };
var checkUser = function () { return ({ type: 'CHECK_USER' }); };
var addTime = function (time) { return ({
    type: "ADD_TIME",
    time: time
}); };
var deleteTime = function (time_idx) { return ({
    type: "DELETE_TIME",
    time_idx: time_idx
}); };
exports.actionCreators = {
    addTime: addTime,
    deleteTime: deleteTime,
    setTimerHistory: setTimerHistory,
    checkUser: checkUser
};
//# sourceMappingURL=actions.js.map