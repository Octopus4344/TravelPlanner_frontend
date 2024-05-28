import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
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
        </Routes>
    </Router>
  );
}

export default App;
