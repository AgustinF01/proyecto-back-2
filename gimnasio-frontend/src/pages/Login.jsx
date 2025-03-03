import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            login(data.token); // Guarda el token en el contexto
            navigate("/dashboard"); // Redirige al dashboard
        } catch (err) {
            setError(err.message || "Error en el inicio de sesión");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>Iniciar sesión</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} required />
                <TextField label="Contraseña" name="password" type="password" fullWidth margin="normal" onChange={handleChange} required />
                <Button type="submit" variant="contained" color="primary" fullWidth>Ingresar</Button>
            </form>
        </Container>
    );
};

export default Login;
