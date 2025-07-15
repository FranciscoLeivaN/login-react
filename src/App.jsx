import { useState } from 'react'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center">
      <header className="w-full py-6 mb-8">
        <h1 className="text-4xl font-bold text-center text-white">
          Login Prueba
        </h1>
      </header>
      
      <main className="flex-grow flex items-center justify-center w-full px-4">
        {isLoggedIn ? (
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md text-center">
            <svg 
              className="w-20 h-20 text-green-500 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h2 className="text-3xl font-bold text-white mb-4">¡Bienvenido!</h2>
            <p className="text-gray-300 mb-6">Has iniciado sesión correctamente</p>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
      </main>
      
      <footer className="w-full py-6 mt-auto">
        <p className="text-center text-gray-400">
          &copy; {new Date().getFullYear()} - Proyecto Login Prueba
        </p>
      </footer>
    </div>
  )
}

export default App
