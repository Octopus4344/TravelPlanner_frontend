import React, { useState } from 'react';
import MapboxAutocomplete from "react-mapbox-autocomplete";
import axios from "axios";

function SearchPlaces({ destination, onAdd }) {
    const [places, setPlaces] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const handleSelect = async (result, lat, lng, text) => {
        const place = {
            name: text,
            latitude: lat,
            longitude: lng,
            place_name: text,
        };

            setPlaces([...places, place]);
            onAdd(place);
            setSearchValue('')

    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }



    return (
        <div>
            <div className={'login-container'}>
                <MapboxAutocomplete
                    publicKey={process.env.REACT_APP_MAPBOX_API_KEY}
                    inputClass='form-control search'
                    onSuggestionSelect={handleSelect}
                    value = {searchValue}
                    onInput = {handleSearchChange}
                    placeHolder='Start entering the place you want to visit...'
                    proximity={`${destination.longitude},${destination.latitude}`}
                />
            </div>
            <div className={'places-list'}>
                <ul>
                    {places.map((place, index) => (
                        <li key={index}>
                            {place.name} - {place.address}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchPlaces;