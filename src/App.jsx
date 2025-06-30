import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/LoginForm';
import ProjectsList from './components/ProjectsList';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await fetch('http://localhost:4000/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  };

  return (
    <>
      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <>
          <div style={{ textAlign: 'right', margin: '16px 32px 0 0' }}>
            <span style={{ marginRight: 12 }}>Hello, {user}!</span>
            <button onClick={handleLogout} style={{ background: '#8e24aa', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>Logout</button>
          </div>
          <ProjectsList />
        </>
      )}
    </>
  );
}

export default App
