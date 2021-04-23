"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
//child component
var timer_1 = require("../components/timer");
var actions_1 = require("../store/Timer/actions");
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = function (dispatch) { return ({
    addTime: function (time) {
        dispatch(actions_1.addTime(time));
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(timer_1.default);
//# sourceMappingURL=TimerContainer.js.map