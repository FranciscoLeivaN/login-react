import { useState } from 'react'
import './App.css'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login Prueba</h1>
      </header>
      
      <main>
        {isLoggedIn ? (
          <div className="welcome-container">
            <h2>Bienvenido!</h2>
            <p>Has iniciado sesión correctamente</p>
            <button onClick={() => setIsLoggedIn(false)}>Cerrar sesión</button>
          </div>
        ) : (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} - Proyecto Login Prueba</p>
      </footer>
    </div>
  )
}

export default App
