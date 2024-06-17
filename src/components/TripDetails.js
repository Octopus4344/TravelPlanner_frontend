import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import './styles/TripDetails_style.css'
import { trips } from "./mockData";
import 'mapbox-gl/dist/mapbox-gl.css'
import { useNavigate } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1Ijoib2N0b3B1czEiLCJhIjoiY2x4Zjhyanc3MG0wNzJsc2hiNXd4aWtlZyJ9.Fqr1-VG0YG-1bWY70bAy_Q'

const TripDetails = () => {
    const navigate = useNavigate()
    const { tripId } = useParams();
    const [days, setDays] = useState([])
    const [visits, setVisits] = useState({})
    const [selectedDay, setSelectedDay] = useState(null)
    const [title, setTitle] = useState('')

    useEffect(() => {
        const trip = trips.find(t => t.id === parseInt(tripId));
        if (trip) {
            const title = trip.name;
            setTitle(title)
            const daysData = trip.days.map(day => day.date);
            const visitsData = trip.days.reduce((acc, day) => {
                acc[day.date] = day.details.map(detail => ({
                    name: detail.place,
                    time: detail.time,
                    // Dummy coordinates, as we don't have real ones in mockData
                    latitude: 51.1093,
                    longitude: 17.0386,
                }));
                return acc;
            }, {});
            setDays(daysData);
            setVisits(visitsData);
        }
    }, [tripId]);

    useEffect(()=> {
        if (selectedDay && visits[selectedDay]) {
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [visits[selectedDay][0].longitude, visits[selectedDay][0].latitude],
                zoom: 10
            });

            visits[selectedDay].forEach(visit => {
                new mapboxgl.Marker()
                    .setLngLat([17.0386,  51.1093])
                    .setPopup(new mapboxgl.Popup().setText(visit.name))
                    .addTo(map)
            })
        }
    }, [selectedDay, visits])

    return(
        <div className={'trip-details-page'}>
            <div className={'day-list-container'}>
                <div className={'headline-container'}>
                <button className={'back'} onClick={() => navigate('/user')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="44" viewBox="0 0 50 44" fill="none">
                    <path d="M15.3556 18H45.5003C47.9855 18 50.0003 20.0147 50.0003 22.5C50.0003 24.9853 47.9855 27 45.5003 27H16.3645L24.81 35.4454C26.5673 37.2028 26.5673 40.052 24.81 41.8094C23.0526 43.5667 20.2034 43.5667 18.446 41.8094L2.34647 25.7099L2.31156 25.6751L2.29032 25.6538L2.18253 25.5459C1.2106 24.574 0.776278 23.2682 0.879427 21.9977C0.775057 20.726 1.20926 19.4184 2.18228 18.4454L18.4457 2.18197C20.203 0.424614 23.0523 0.424614 24.8097 2.18197C26.567 3.93932 26.567 6.78857 24.8097 8.54592L15.3556 18Z" fill="white"/>
                    </svg></button>
                <h1>{title}</h1>
                </div>
                <div className={'day-list'}>
                    {days.map((day) => (
                        <div key={day} className={'day-item'} onClick={() => setSelectedDay(day)}>
                            <h2>Day {day}</h2>
                            {selectedDay === day && (
                                <div className={"visit-list-container"}>
                                    {visits[day].map((visit, index) => (
                                        // <div key={visit.id} className={'visit-item'}>
                                        //     {visit.start_time} - {visit.name}
                                        // </div>
                                        <div key={index} className={'visit-item'}>
                                            <h3>{visit.time} - {visit.name}</h3>
                                        </div>

                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div id={'map'} className={'map-container'}></div>

        </div>
    )


}

export default TripDetails;