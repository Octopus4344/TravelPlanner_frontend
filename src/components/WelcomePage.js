import React from 'react';
import "./styles/WelcomePage_style.css"
import { useNavigate } from 'react-router-dom';
function WelcomePage() {
    const navigate = useNavigate();
    return(
        <div className="welcome-page">
                <div className="left-side">
                    <div className="welcome">
                        <h1 className={'welcome-text'}>Plan your trip with ease with <span className={"blue-text"}>Travel Planner</span></h1>
                    </div>
                    <div className="buttons">
                        <div className="log-in-container">
                            <h3 className="little-text">Want to check Travel Planner out?</h3>
                            <button className="get-started" onClick={() => navigate('/signup')}>Get started</button>
                        </div>
                        <div className="log-in-container">
                            <h3 className="little-text">Already have an account?</h3>
                            <button className="log-in" onClick={() => navigate('/login')}>Log in</button>
                        </div>
                    </div>
                </div>
            <div className="right-side">
                <div className={"wave"}> </div>

            </div>
        </div>
    );
}

export default WelcomePage;