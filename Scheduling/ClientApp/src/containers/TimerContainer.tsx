import { connect } from 'react-redux';

//child component
import Timer from '../components/timer';

import { addTime } from "../store/Timer/actions";

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    addTime: (time) => {
        dispatch(addTime(time));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer);