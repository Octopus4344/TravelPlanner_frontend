import React from 'react';
import "./styles/TripList_style.css"
import TripCard from "./TripCard";

function TripList({ trips, onTripClick }) {
    return(
        <div className="trip-list">
            {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip}/>
            ))}
        </div>

    )
}

export default TripList;