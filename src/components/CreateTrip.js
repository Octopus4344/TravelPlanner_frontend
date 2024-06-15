import React, { useState } from "react";
import axios from 'axios'
import SearchDestination from './createTripComponents/SearchDestination.js'
import SelectDateRange from './createTripComponents/SelectDateRange.js'
import SetDailySchedule from './createTripComponents/SetDailySchedule.js'
import SearchPlaces from './createTripComponents/SearchPlaces.js'


function CreateTrip({ user, onTripCreated }) {
    const [step, setStep] = useState(1);
    const [destination, setDestination] = useState(null);
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [dailySchedule, setDailySchedule] = useState({startHour: '', endHour: '', startPlace: null});
    const [places, setPlaces] = useState([]);
    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');

    const handleDestinationSearch = async (place) => {
        try {
            const pexelsResponse = await axios.get(`https://api.pexels.com/v1/search?query=${place.place_name}`,
                {
                    headers:{
                        Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
                    }
                });
            const photo = pexelsResponse.data.photos[0]?.src?.medium || 'https://via.placeholder.com/150';
            setDestination(place)
            setPhoto(photo)
            setStep(3);
        } catch (error) {
            console.error('Error fetching destination or photo', error);
            setPhoto('https://via.placeholder.com/150')
            setDestination(place)
            setStep(3)
        }
    };
    const handleDateRangeSelect = (startDate, endDate) => {
        setDateRange({startDate, endDate});
        setStep(3);
    };

    const handleDailyScheduleSelect = (startHour, endHour, startPlace) => {
        setDailySchedule({startHour, endHour, startPlace});
        setStep(4);

    }

    const handlePlaceSAdd = (newPlace) => {
        setPlaces([...places,newPlace]);
    };

    const handleSubmit = async () => {
        const tripData = {
            title: title,
            destination: destination,
            description: 'Trip to ${destination.place_name}',
            start_place_longitude: dailySchedule.startPlace.longitude,
            start_place_latitude: dailySchedule.startPlace.latitude,
            start_date: dateRange.startDate,
            end_date: dateRange.endDate,
            start_hour: dailySchedule.startHour,
            end_hour: dailySchedule.endHour,
            user: user.id,
            photo: photo
        };

        try {
            await axios.post('http://localhost:5000/save-trip', tripData);
            console.log('Trip saved to file');

            const response = await axios.post(`/api/itineraries/`, tripData);
            const tripID = response.data.id;

            await axios.post('/api/itineraries/${tripId}/add_places/', { places });

            console.log('Trip created successfully', response.data);
            onTripCreated(response.data);

        } catch (error){
            console.error('Error creating trip', error);
        }
    }

    return (
        <div className={"create-trip-container"}>
            {step === 1 && (
                <>
                    <input
                        type="text"
                        placeholder={"Your trip title"}
                        value={title}
                        onChange = {(e) => { setTitle(e.target.value)}}
                    />
                    <SearchDestination onSearch={handleDestinationSearch} />
                </>
            )}
            {step === 2 && <SelectDateRange onSelectDateRangeSelect={handleDateRangeSelect} />}
            {step === 3 && <SetDailySchedule onSet={handleDailyScheduleSelect}/>}
            {step === 4 && (
                <SearchPlaces destination={destination} onAdd={handlePlaceSAdd} />
            )}
            {step === 4 && (
                <button onClick={handleSubmit}>Submit</button>
            )}
        </div>
    )


}

export default CreateTrip;