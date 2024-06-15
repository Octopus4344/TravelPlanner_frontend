import React from 'react'
import MapboxAutocomplete from "react-mapbox-autocomplete";

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
                 publicKey='sk.eyJ1Ijoib2N0b3B1czEiLCJhIjoiY2x4Zjl2YmptMG5sNTJrcXRuNWc0djB5aiJ9.UBsAVMDLpNokf4lX0gJMJA'
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