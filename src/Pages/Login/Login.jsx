import React, { useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsmobile from '../../aws-exports'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

Amplify.configure(awsmobile);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await Auth.signIn(email, password); 
            console.log('Logged in user:', user);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Failed to sign in. Please check your credentials.');
        }
    };

    return (
        <div className='main'>
            <div className='userlogin'>
                <h3>User Login</h3>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <FontAwesomeIcon className='user' icon={faUser} />
                    <input
                        type='email'
                        placeholder='Enter Your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FontAwesomeIcon className='password' icon={faLock} />
                    <input
                        type='password'
                        placeholder='Enter Your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit'>Login</button>
                </form>
                <div>
                    Don't have an account? <Link to='/register' className='registerlink'>Register Now</Link>
                </div>
                <Link to='/adminlogin'>Admin Login</Link>
            </div>
        </div>
    );
};

export default Login;
