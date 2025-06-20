import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6">Todo App</Typography>
                <div>
                    {user ? (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}
