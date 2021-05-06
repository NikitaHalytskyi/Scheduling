import '../../../../style/Pop.css';
import * as React from 'react';

import DatePicker from 'react-datepicker';

export default function Calendar({ active, setActive }){
    return (
            <React.Fragment>
                <div className={active ? "popUp active" : "popUp"} >
                    <div className="pop__content" >
                        <h2 className="popHead">Plan your time</h2>
                        <DatePicker className="datePick"   locale="ua" />
                        <button className="close-pop">Cancel</button>
                        <button className="close-pop">Ok</button>
                    </div>
                </div>
            </React.Fragment>
        );

};