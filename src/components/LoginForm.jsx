import { useState } from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        onLogin(data.username);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
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
      <button className={styles.button} type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
    </form>
  );
}
