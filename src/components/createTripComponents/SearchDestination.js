import React from 'react'
import MapboxAutocomplete from "react-mapbox-autocomplete";
import "./style.css"

const SearchDestination = ({ onSearch }) => {
    const handleSelect = (result, lat, lng, text) => {
        const place = {
            name: text,
            latitude: lat,
            longitude: lng,
            place_name: text
        };
        onSearch(place);
    };

    const handleError = (error) => {
        console.error('An error occurred', error);
        alert('There was a problem retrieving data');
    };

     return (
         <div>
             <MapboxAutocomplete
                 publicKey={process.env.REACT_APP_MAPBOX_API_KEY}
                 inputClass='form-control search'
                 onSuggestionSelect={handleSelect}
                 onError={handleError}
                 placeHolder='Start entering destination...'
                 proximity='ip'
             />
         </div>
     );
};

export default SearchDestination