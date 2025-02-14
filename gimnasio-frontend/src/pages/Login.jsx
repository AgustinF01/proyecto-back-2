import { useState, useContext } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/users/login", { email, password });
            login(res.data.token);
            window.location.href = "/dashboard";
        } catch (error) {
            alert("Error en login");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4">Iniciar Sesión</Typography>
            <form onSubmit={handleLogin}>
                <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
                <TextField fullWidth type="password" label="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
                <Button type="submit" variant="contained" color="primary">Ingresar</Button>
            </form>
        </Container>
    );
};

export default Login;
