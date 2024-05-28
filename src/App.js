import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import React from 'react';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
    </Router>
  );
}

export default App;
