import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Container, Typography, Button } from "@mui/material";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Bienvenido, {user.name}</Typography>
            <Typography variant="h6">Rol: {user.role}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>Cerrar sesión</Button>
        </Container>
    );
};

export default Dashboard;
