import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './signup.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isUserRegistered, setIsUserRegistered] = useState(false); // To track if user is registered or not
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (confirmpassword !== password) {
      setError('Password Mismatch');
      return;
    }

    try {
      
      const { user } = await Auth.signUp({
        username: email, 
        password: password,
        attributes: {
          email,            
          given_name: name,  
        },
      });

      console.log('User successfully registered:', user);
      alert('User Created Successfully. Please check your email to verify the account.');

      setIsUserRegistered(true);  

    } catch (error) {
      console.error('Error registering user:', error);
      setError(error.message || 'Error registering. Please try again.');
    }
  };

  const handleConfirmation = async (event) => {
    event.preventDefault();

    try {
    
      await Auth.confirmSignUp(email, confirmationCode);
      alert('User confirmed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error confirming user:', error);
      setError(error.message || 'Error confirming user. Please try again.');
    }
  };

  return (
    <div className="registerdiv">
      <form className="containerdiv" onSubmit={isUserRegistered ? handleConfirmation : handleRegister}>
        <h2>{isUserRegistered ? 'Confirm Registration' : 'Registration'}</h2>

        {/* Display error message if any */}
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isUserRegistered}  // Disable email input once registered
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isUserRegistered}  // Disable name input once registered
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isUserRegistered}  // Disable password input once registered
        />

        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isUserRegistered}  // Disable password input once registered
        />

        {/* Confirmation Code Field */}
        {isUserRegistered && (
          <>
            <label htmlFor="confirmationCode">Confirmation Code</label>
            <input
              type="text"
              name="confirmationCode"
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
          </>
        )}

        <center>
          <button type="submit" className="submit-btn">
            {isUserRegistered ? 'Confirm' : 'Register'}
          </button>
        </center>
      </form>
    </div>
  );
};

export default Register;
