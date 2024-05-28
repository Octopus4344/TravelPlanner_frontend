import React from 'react';
import "./styles/WelcomePage_style.css"
import LoginPage from "./LoginPage";
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
                <div className={"wave"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="832" height="1023" viewBox="0 0 832 1023"
                         fill="none">
                        <path
                            d="M217 849.5C107.4 909.5 27 989.834 0.5 1022.5H832.5V0.500021L774.5 0.5L726.5 72.5C659.885 172.423 583 144.5 424 308C296.8 438.8 303 552.5 322 593C332.667 653.5 326.6 789.5 217 849.5Z"
                            fill="#4449AE"/>
                    </svg>
                </div>

            </div>
        </div>
    );
}

export default WelcomePage;