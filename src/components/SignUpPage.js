import React from 'react';
import "./styles/SignUpPage_style.css"
import { useNavigate } from 'react-router-dom';
import { users } from "./mockData";

function SignUpPage({ setUser }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { id: users.length + 1, username, password, email, trips: [] };
        users.push(newUser);
        setUser(newUser);
        navigate("/user");
    }
    return(
        <div className={"SignUpPage"}>
            <div className={"signup-main-container"}>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className={"login-container"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="744" height="470" viewBox="0 0 744 470" fill="none">
                            <path d="M692.022 0L372 253.264L51.9783 0H692.022Z" fill="#959595"/>
                            <path
                                d="M0.611385 9.08378C0.209663 11.3285 0 13.6398 0 16V431C0 452.539 17.4609 470 39 470H705C726.539 470 744 452.539 744 431V16C744 13.6398 743.79 11.3285 743.389 9.08378L372 303L0.611385 9.08378Z"
                                fill="#959595"/>
                        </svg>
                        <input type={"text"} placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className={"login-container"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="426" height="441" viewBox="0 0 426 441" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M213.5 168C260.168 168 298 130.392 298 84C298 37.6081 260.168 0 213.5 0C166.832 0 129 37.6081 129 84C129 130.392 166.832 168 213.5 168ZM366.173 229.877C406.119 276.865 426 374.549 426 441H213H0C1.52588e-05 374.549 21.6062 276.865 61.5514 229.877C96.602 188.647 143.253 189.414 192.325 190.222C199.178 190.334 206.078 190.448 213 190.448C219.902 190.448 226.809 190.335 233.687 190.223C283.105 189.415 331.109 188.631 366.173 229.877Z"
                                  fill="#959595"/>
                        </svg>
                        <input type={"text"} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className={"login-container"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="392" height="465" viewBox="0 0 392 465" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M94.9527 194H296.047C296.673 188.344 297 182.507 297 176.5C297 100.686 244.977 52 195.5 52C146.023 52 94 100.686 94 176.5C94 182.507 94.3266 188.344 94.9527 194ZM42.745 194H42C18.804 194 0 212.804 0 236V423C0 446.196 18.804 465 42 465H350C373.196 465 392 446.196 392 423V236C392 212.804 373.196 194 350 194H348.255C348.748 188.243 349 182.406 349 176.5C349 79.0217 280.276 0 195.5 0C110.724 0 42 79.0217 42 176.5C42 182.406 42.2522 188.243 42.745 194ZM209 340.803C223.002 335.7 233 322.267 233 306.5C233 286.342 216.658 270 196.5 270C176.342 270 160 286.342 160 306.5C160 321.889 169.524 335.055 183 340.422V377C183 379.209 184.791 381 187 381H205C207.209 381 209 379.209 209 377V340.803Z"
                                  fill="#959595"/>
                        </svg>
                        <input type={"password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className={"log-buttons"}>
                        <button className={"l-log-in"} type={"submit"}>SIGN UP</button>
                        <div className={"small-buttons"}>
                            <h3>Already have an account? <button onClick={() => navigate('/login')}>Log in</button> or <button
                                onClick={() => navigate('/')}>Go back</button></h3>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;