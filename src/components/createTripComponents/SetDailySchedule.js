import React, { useState } from 'react';
import TimePicker from 'react-time-picker'
import SearchDestination from "./SearchDestination";
import './style.css'

function SetDailySchedule({ onSet }) {
    const [startHour, setStartHour] = useState('')
    const [endHour, setEndHour] = useState('');
    const [startPlace, setStartPlace] = useState(null)

    const handleSet = () => {
        onSet(startHour, endHour, startPlace)
    }

    const isNextEnabled = () => {
        const dStartHour = new Date(`1970-01-01T${startHour}:00`)
        const dEndHour = new Date(`1970-01-01T${endHour}:00`)
        return startHour && startPlace && endHour && (dStartHour<dEndHour);
    }

    return (
        <div>
            <h3 className={'question'}>What time do you plan to start and finish sightseeing? Where is your starting point?</h3>
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
                <div className={'login-container'}>
                <SearchDestination onSearch={setStartPlace}/>
                </div>
            </div>
            <button disabled={!isNextEnabled()} className={'navButton'} onClick={handleSet}>Next</button>
        </div>
    )
}

export default SetDailySchedule;