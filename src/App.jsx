import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/LoginForm';
import ProjectsList from './components/ProjectsList';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <ProjectsList />
      )}
    </>
  );
}

export default App
