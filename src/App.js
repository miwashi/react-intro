import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      setError('Not authorized');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <div className="login-dialog">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Log In</button>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
