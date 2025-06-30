import { useState } from 'react'
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
          <div className="logout-bar">
            <span>Hello, {user}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
          <ProjectsList />
        </>
      )}
    </>
  );
}

export default App
