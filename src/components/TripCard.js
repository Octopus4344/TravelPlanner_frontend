import React from 'react';
import "./styles/TripCard_style.css"
import { useNavigate } from 'react-router-dom';

function TripCard({ trip }) {
    const navigate = useNavigate();

    const handleClick=()=>{
        navigate(`/trip/${trip.id}`);
    }

    return(
        <div className="trip-card" onClick={handleClick}>
            <div className="trip-card-header">{trip.title}</div>
            <img className={"trip-card-photo"} src={trip.photo_url} alt="trip.name" />
            <div className={"trip-card-hover"}>
                <p>Start time: {trip.start_date}</p>
                <p>End time: {trip.end_date}</p>
                <p>Destination: {trip.destination}</p>
            </div>
        </div>

    )
}

export default TripCard;