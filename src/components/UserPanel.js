import React, { useEffect, useState } from 'react';
import "./styles/UserPanel_style.css"
import { useNavigate } from 'react-router-dom';
import {trips, users} from "./mockData";
import TripList from "./TripList";

function UserPanel({ user, setUser }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, [setUser])


    const handleLogout = () => {
      setUser(null);
      localStorage.removeItem("user");
      navigate('/');
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    const userTrips = trips.filter(trip => trip.user === user.id);

    const handleCreateTrip = () => {
        navigate('/create');
    };


    return(
        <div className="user-panel">
            <div className="top-container">
                <h1 className={'headline'}>Welcome back!</h1>
                <div className="shape"></div>
                <div className="circle-buttons">
                    <button className={'logout'} onClick={handleCreateTrip}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="79" height="79" viewBox="0 0 79 79" fill="none">
                            <path
                                d="M39.5 0C35.2085 0 31.7295 3.47897 31.7295 7.77049V31.7295H7.77049C3.47897 31.7295 0 35.2085 0 39.5C0 43.7915 3.47897 47.2705 7.77049 47.2705H31.7295V71.2295C31.7295 75.521 35.2085 79 39.5 79C43.7915 79 47.2705 75.521 47.2705 71.2295V47.2705H71.2295C75.521 47.2705 79 43.7915 79 39.5C79 35.2085 75.521 31.7295 71.2295 31.7295H47.2705V7.77049C47.2705 3.47897 43.7915 0 39.5 0Z"
                                fill="white"/>
                        </svg>
                    </button>
                    <button className={'add-button'} onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="67" height="73" viewBox="0 0 67 73" fill="none">
                            <path
                                d="M33.5001 0C30.1793 0 27.4873 2.69202 27.4873 6.01281V37.7949C27.4873 41.1157 30.1793 43.8077 33.5001 43.8077C36.8209 43.8077 39.5129 41.1157 39.5129 37.7949V6.01282C39.5129 2.69203 36.8209 0 33.5001 0Z"
                                fill="white"/>
                            <path
                                d="M0 39.5C0 25.8016 8.22187 14.0235 20 8.83136V21.4983C14.535 25.6033 11 32.1388 11 39.5C11 51.9264 21.0736 62 33.5 62C45.9264 62 56 51.9264 56 39.5C56 32.1388 52.465 25.6033 47 21.4983V8.83136C58.7781 14.0235 67 25.8016 67 39.5C67 58.0015 52.0015 73 33.5 73C14.9985 73 0 58.0015 0 39.5Z"
                                fill="white"/>
                        </svg>
                    </button>
                </div>
            </div>
            <h3 className={"some-text"}>Where are you travelling today?</h3>
            <div className={'trip-list-container'}>
                <TripList trips={userTrips}/>
            </div>
        </div>
    )

}

export default UserPanel;


