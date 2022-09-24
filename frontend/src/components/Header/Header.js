import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './Header.css';

const Header = () => {
    const[token, setToken] = useToken();
    const [username, setUsername] = useState();

    const userData = async () => {
        try {
            const res = await fetch('http://localhost:4000/users', {
                headers: {
                    Authorization: token,
                },
            });

            const body = await res.json();

            if (body.status === 'ok') {
                setUsername(body.data.user.username);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (token) userData();

    return (
        <header>
            <h1>
                <NavLink to='/'>ciudadaccesibleapi</NavLink>
            </h1>
            <nav>
                {token && <p>@{username}</p>}
                {!token && (
                    <div className='button'>
                        <NavLink to='/login'>Log In</NavLink>
                    </div>
                )}
                {!token && (
                    <div className='button'>
                        <NavLink to='/signup'>Sign Up</NavLink>
                    </div>
                )}
                {token && (
                    <div className='button'>
                        <NavLink to='/new'>Mensaje</NavLink>
                    </div>
                )}
                {token && (
                    <div className='button' onClick={() => setToken(null)}>
                        <p>Logout</p>
                    </div>
                )}
            </nav>
        </header>
    ); 
};
export default Header;