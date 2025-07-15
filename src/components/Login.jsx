import { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      // Check if we should use mock API response (for GitHub Pages deployment)
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        // Simulate API response for GitHub Pages demo
        if (isLogin && formData.username === 'demo' && formData.password === 'password') {
          setSuccess('Login exitoso! (Demo Mode)');
          localStorage.setItem('token', 'mock-jwt-token');
          if (onLoginSuccess) onLoginSuccess();
          return;
        } else if (!isLogin) {
          setSuccess('Registro exitoso! (Demo Mode)');
          localStorage.setItem('token', 'mock-jwt-token');
          return;
        } else {
          setError('Credenciales inválidas (Demo: use demo/password)');
          return;
        }
      }
      
      // Real API call if not using mock mode
      const url = isLogin ? 
        `${import.meta.env.VITE_API_URL}/users/login` : 
        `${import.meta.env.VITE_API_URL}/users/register`;
      
      const response = await axios.post(url, formData);
      
      if (response.data.success) {
        setSuccess(isLogin ? 'Login exitoso!' : 'Registro exitoso!');
        // En una app real, guardarías el token en localStorage
        localStorage.setItem('token', response.data.token);
        // Y redirigirías al usuario
        if (isLogin && onLoginSuccess) onLoginSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ha ocurrido un error');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
      </h2>
      
      {error && (
        <div className="bg-red-500 bg-opacity-30 text-white px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500 bg-opacity-30 text-white px-4 py-3 rounded-md mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {!isLogin && (
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email de usuario
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required={!isLogin}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
        
        <div className="mb-6">
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg"
        >
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-400">
        {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
        <button 
          type="button" 
          className="text-blue-500 hover:text-blue-400 font-medium focus:outline-none"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Regístrate' : 'Inicia Sesión'}
        </button>
      </div>
    </div>
  );
}

export default Login;
