import React, {useEffect, useState} from "react";
import SearchDestination from './createTripComponents/SearchDestination.js'
import SelectDateRange from './createTripComponents/SelectDateRange.js'
import SetDailySchedule from './createTripComponents/SetDailySchedule.js'
import SearchPlaces from './createTripComponents/SearchPlaces.js'
import { useNavigate } from "react-router-dom";
import { createClient } from "pexels"
import axiosInstance from "./axiosInstance";

const pexelsClient = createClient(process.env.REACT_APP_PEXELS_API_KEY)


function CreateTrip({ onTripCreated }) {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [destination, setDestination] = useState(null);
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [dailySchedule, setDailySchedule] = useState({startHour: '', endHour: '', startPlace: null});
    const [places, setPlaces] = useState([]);
    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('')

    const handleDestinationSearch = async (place) => {
        try {
            const response = await pexelsClient.photos.search({ query: place.place_name, per_page: 1});
            const photo = response.photos[0]?.src?.medium || 'https://via.placeholder.com/150'
            console.log('Photo: ', photo)
            setDestination(place)
            setPhoto(photo)
        } catch (error) {
            console.error('Error fetching destination or photo', error);
            setPhoto('https://via.placeholder.com/150')
            setDestination(place)
        }
    };
    const handleDateRangeSelect = (startDate, endDate) => {
        setDateRange({startDate, endDate});
    };

    const handleDailyScheduleSelect = (startHour, endHour, startPlace) => {
        setDailySchedule({startHour, endHour, startPlace});
        setStep(4)

    }

    const handlePlaceSAdd = (newPlace) => {
        setPlaces([...places,newPlace]);
    };

    const isNExtEnabled = () => {
        if (step === 1) {
            return title && destination;
        }
        else if (step === 2) {
            return dateRange.startDate && dateRange.endDate;
        }
        return false
    }



    const handleSubmit = async () => {
        const tripData = {
            title: title,
            destination: destination.name,
            description: 'Trip to ${destination.place_name}',
            start_place_latitude: dailySchedule.startPlace.latitude,
            start_place_longitude: dailySchedule.startPlace.longitude,
            start_date: dateRange.startDate.toLocaleDateString('en-CA'),
            end_date: dateRange.endDate.toLocaleDateString('en-CA'),
            start_hour: dailySchedule.startHour,
            end_hour: dailySchedule.endHour,
            photo_url: photo,
            user: 1,
        };
        console.log(tripData)
        console.log(places)

        const accessToken = localStorage.getItem("access-token");
        if (!accessToken) {
            navigate('/');
        }

        try {
            const {data} = await axiosInstance.post('http://localhost:8000/api/itineraries/',
                tripData, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            console.log('Trip saved',data);
            const tripId = data.id

            const sendPlace = async (place) => {
                try{
                    const response = await axiosInstance.post('http://localhost:8000/api/places/', {
                        ...place
                    }, {
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                    }
                    });
                    return response.data;
                }catch (e){
                    console.error('error',e)
                }
            }

            const placePromises = places.map(sendPlace);
            const placeResponses = await Promise.all(placePromises)

            console.log('places: ',placeResponses)

            const placesData = placeResponses.map(placeResponse => ({
                place_id: placeResponse.id,
                duration: 60
            }));


            const itineraryData = {
                itinerary_id: tripId,
                places:placesData
            }


            const response = await axiosInstance.post('http://localhost:8000/api/optimize-route/',
                itineraryData, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

            navigate('/user')

        } catch (error){
            console.error('Error creating trip', error);
        }
    }

    return (
        <div className={"create-trip-page"}>
            {step === 1 && (
                <div className={"create-trip-container"}>
                <>
                    <h1>Let's plan your next, great trip!</h1>
                    <h3>First, please, give your trip a title and provide your destination</h3>
                    <div className={'login-container'}>
                        <input
                            type="text"
                            placeholder={"Your trip title"}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setError('');
                            }}
                        />
                    </div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <div className={'login-container'}>
                        <SearchDestination onSearch={handleDestinationSearch}/>
                    </div>
                    <button disabled={!isNExtEnabled()} className={'navButton'} onClick={() => setStep(2)}>Next</button>
                </>
                </div>
            )}
            {step === 2 && (
                <>
                    <div className={'calendar-container'}>
                        <h3>When will your trip trip place?</h3>
                        <SelectDateRange onSelectDateRangeSelect={handleDateRangeSelect}/>
                        <button className={'navButton'} onClick={() => setStep(1)}>Back</button>
                        <button disabled={!isNExtEnabled()} className={'navButton'} onClick={() => setStep(3)}>Next
                        </button>
                    </div>
                </>
            )}
            {step === 3 && (
                <>
                    <div className={"create-trip-container"}>
                    <SetDailySchedule onSet={handleDailyScheduleSelect}/>
                    <button className={'navButton'} onClick={() => setStep(2)}>Back</button>
                    </div>
                </>
            )}
            {step === 4 && (
                <>
                    <div className={"create-trip-container"}>
                        <h3>Please, provide a list of places you want to visit during your trip</h3>
                        <SearchPlaces destination={destination} onAdd={handlePlaceSAdd}/>
                        <button className={'navButton'} onClick={() => setStep(3)}>Back</button>
                        <button className={'navButton'} onClick={handleSubmit}>Submit</button>
                    </div>
                </>
            )
            }

        </div>
    )


}

export default CreateTrip;