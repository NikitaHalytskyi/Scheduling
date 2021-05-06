import * as React from 'react';
import '../style/rsuite-default.css';
import { DateRangePicker } from 'rsuite'

type PickerProps = {
    availableDays: number,
    setRange: Function
}

const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

export const DataRangePicker: React.FunctionComponent<PickerProps> = ({ availableDays, setRange }) => {
    
    return (
        <React.Fragment>
              <DateRangePicker disabledDate={combine(allowedMaxDays(availableDays), beforeToday())}
              onOk={(date: any, event: React.SyntheticEvent<HTMLElement, Event>) => setRange(new Date(date[0]), new Date(date[1]))}/>
        </React.Fragment>
    );
}