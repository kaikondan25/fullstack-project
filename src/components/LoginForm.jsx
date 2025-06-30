import { useState } from 'react';
import styles from './LoginForm.module.css';

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
    <form onSubmit={handleSubmit} className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.formGroup}>
        <label className={styles.label}>Username:</label>
        <input className={styles.input} value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className={styles.button} type="submit">Login</button>
    </form>
  );
}
