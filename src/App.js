import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import UserPanel from './components/UserPanel';
import CreateTrip from "./components/CreateTrip";
import TripDetails from "./components/TripDetails"
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import React, { useState } from 'react';


function App() {
    const [user, setUser] = useState(null);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/login" element={<LoginPage setUser={setUser} />} />
                <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
                <Route path="/user" element={<UserPanel user={user} setUser={setUser} />} />
                <Route path="/create" element={<CreateTrip user={user} onTripCreated={(trip) => console.log(trip)} setUser={setUser}/> } />
                <Route path="/trip/:tripId" element={<TripDetails />}/>
            </Routes>
        </Router>
    );
}

export default App;
