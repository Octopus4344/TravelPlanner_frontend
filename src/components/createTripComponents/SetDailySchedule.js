import React, { useState } from 'react';
import TimePicker from 'react-time-picker'
import MapboxAutocomplete from "react-mapbox-autocomplete";
import SearchDestination from "./SearchDestination";
import './style.css'

function SetDailySchedule({ onSet }) {
    const [startHour, setStartHour] = useState('')
    const [endHour, setEndHour] = useState('');
    const [startPlace, setStartPlace] = useState(null)

    const handleSet = () => {
        onSet(startHour, endHour, startPlace)
    }

    return (
        <div>
            <h3>Set daily schedule</h3>
            <div>
                <label>Start Hour</label>
                <TimePicker className={'time-picker'} onChange={setStartHour} value={startHour}/>
            </div>
            <div>
                <label>End hour</label>
                <TimePicker className={'time-picker'} onChange={setEndHour} value={endHour}/>
            </div>
            <div>
                <label>Start place</label>
                <SearchDestination onSearch={setStartPlace}/>
            </div>
            <button onClick={handleSet}>Next</button>
        </div>
    )
}

export default SetDailySchedule;