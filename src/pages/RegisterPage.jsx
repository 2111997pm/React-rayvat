
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            alert('Registration is disabled for dummy API. Use predefined credentials to login.');
            navigate('/');
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8 }}>
            <Typography variant="h5">Register (Disabled)</Typography>
            <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} margin="normal" required />
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Register</Button>
            <Button fullWidth onClick={() => navigate('/')} sx={{ mt: 1 }}>Back to Login</Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
    );
}
