import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'


function SelectDateRange({ onSelectDateRangeSelect }) {
    const [state, setState] =useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setState([ranges.selection]);
        onSelectDateRangeSelect(startDate,endDate)
    };

    return (
        <DateRangePicker
            ranges={state}
            onChange={handleSelect}
        />
    )
}

export default SelectDateRange;