import React from 'react';
import "./styles/UserPanel_style.css"
import { useNavigate } from 'react-router-dom';

function UserPanel({ user, setUser }) {
    const navigate = useNavigate();
    const handleLogout = () => {
      setUser(null);
      navigate('/');
    };

    return(
        <div className="user-panel">
            <h1>Welcome, {user.username}!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )

}

export default UserPanel;


