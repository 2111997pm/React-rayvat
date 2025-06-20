import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ username, password }))
      navigate('/products');
    } catch (err) {
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8 }}>
      <Typography variant="h5">Login</Typography>
      <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" required />
      <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
      <Button fullWidth onClick={() => navigate('/register')} sx={{ mt: 1 }}>Register</Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}
