import React, { useState } from 'react';
import axios from "axios";

function SearchPlaces({ destination, onAdd }) {
    const [places, setPlaces] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [suggestions, setSuggestions] = useState([])

    const handleSelect = async (place) => {
        const selectedPlace = {
            name: place.text,
            latitude: place.center[1],
            longitude: place.center[0],
            place_name: place.place_name,
            feature_type: place.place_type[0],
            category: place.properties?.category || 'Unknown',
            address: place.properties?.address || "Unknown"

        };

        console.log(place);
        console.log(selectedPlace);

            setPlaces([...places, selectedPlace]);
            onAdd(selectedPlace);
            setSearchValue('');
        setSuggestions([])

    };

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearchValue(value);

        if (value.length > 2) {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
                {
                    params: {
                        access_token: process.env.REACT_APP_MAPBOX_API_KEY,
                        proximity: `${destination.longitude},${destination.latitude}`,
                    },
                });

            setSuggestions(response.data.features);
        } else{
            setSuggestions([]);
        }
    }



    return (
        <div>
            <div className={'login-container'}>
                <input
                    type={'text'}
                    className={'form-control search'}
                    value = {searchValue}
                    onChange={handleSearchChange}
                    placeholder='Start entering the place...'
                />
            </div>
                {suggestions.length > 0 && (
                    <ul className={"suggestion-list"}>
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSelect(suggestion)}>
                                {suggestion.place_name}
                            </li>
                        ))}
                    </ul>
                )}
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