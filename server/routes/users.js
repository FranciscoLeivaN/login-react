import express from 'express';
const router = express.Router();

// Mock users data (replace with real database in production)
const users = [
  { id: 1, username: 'usuario1', email: 'usuario1@example.com', password: 'password123' },
  { id: 2, username: 'usuario2', email: 'usuario2@example.com', password: 'password123' }
];

// GET all users
router.get('/', (req, res) => {
  const safeUsers = users.map(({ password, ...user }) => user);
  res.json(safeUsers);
});

// POST login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // En una aplicación real, usarías JWT o algún otro método de autenticación
    const { password, ...userWithoutPassword } = user;
    res.json({ 
      success: true, 
      user: userWithoutPassword,
      token: 'mock-jwt-token'
    });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
});

// POST register
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Check if user already exists
  if (users.some(user => user.username === username || user.email === email)) {
    return res.status(400).json({ success: false, message: 'Usuario o email ya existen' });
  }
  
  // Create new user (in a real app, you'd use a database)
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password
  };
  
  users.push(newUser);
  
  const { password: pwd, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    success: true,
    user: userWithoutPassword,
    token: 'mock-jwt-token'
  });
});

export default router;
