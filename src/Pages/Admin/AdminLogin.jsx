import React, { useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
  };

  return (
    <>
    <div className="wrapper">
      <div className="logo">
        <img 
          src="/src/assets/logo jobsync2.png" 
          alt="Twitter Logo" 
        />
      </div>
      <div className="text-center mt-4 name">JS Admin</div>
      
      <form className="p-3 mt-3" onSubmit={handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <FaUser className="icon" />
          <input 
            type="text" 
            name="userName" 
            id="userName" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <FaKey className="icon" />
          <input 
            type="password" 
            name="password" 
            id="pwd" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn mt-3">Login</button>
      </form>
    </div>
    </>
  );
}
