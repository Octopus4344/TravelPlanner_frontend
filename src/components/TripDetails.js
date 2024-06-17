import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import './styles/TripDetails_style.css'
import { trips } from "./mockData";
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoib2N0b3B1czEiLCJhIjoiY2x4Zjhyanc3MG0wNzJsc2hiNXd4aWtlZyJ9.Fqr1-VG0YG-1bWY70bAy_Q'

const TripDetails = () => {
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
                <h1>{title}</h1>
                <div className={'day-list'}>
                {days.map((day)=>(
                    <div key={day} className={'day-item'} onClick={()=>setSelectedDay(day)}>
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