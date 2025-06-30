import { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login: accept any non-empty username/password
    if (username && password) {
      onLogin(username);
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Username:</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
