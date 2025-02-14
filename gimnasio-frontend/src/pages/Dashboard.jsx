import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Bienvenido, {user.name}</Typography>
            <Typography variant="h6">Rol: {user.role}</Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>Cerrar sesión</Button>
        </Container>
    );
};

export default Dashboard;