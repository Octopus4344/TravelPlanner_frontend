import React, { useState } from 'react';
import MapboxAutocomplete from "react-mapbox-autocomplete";
import axios from "axios";

function SearchPlaces({ destination, onAdd }) {
    const [places, setPlaces] = useState([])

    const handleSelect = async (result, lat, lng, text) => {
        const place = {
            name: text,
            latitude: lat,
            longitude: lng,
            place_name: text
        };
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`,
                {
                    params: {
                        place_id: result.id,
                        key: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
                    },
                });
            const placeDetails = response.data.result;
            const newPlace = {
                ...place,
                address: placeDetails.formatted_address,
                category: placeDetails.types.join(', '),
                opening_hours: placeDetails.opening_hours,
            };

            setPlaces([...places, newPlace]);
            onAdd(newPlace);
        }catch (error) {
            console.error('Error fetching data', error)
            setPlaces([...places,place]);
            onAdd(place)
        }

    };



    return (
        <div>
            <MapboxAutocomplete
                publicKey={process.env.REACT_APP_MAPBOX_API_KEY}
                inputClass='form-control search'
                onSuggestionSelect={handleSelect}
                placeHolder='Start entering place you want to visit...'
                proximity={`${destination.longitude},${destination.latitude}`}
            />
            <ul>
                {places.map((place, index) => (
                    <li key={index}>
                        {place.name} - {place.address}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchPlaces;