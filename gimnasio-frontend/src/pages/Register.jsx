import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            navigate("/login"); // Redirige al login tras registrarse
        } catch (err) {
            setError(err.message || "Error en el registro");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>Registro</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField label="Nombre" name="name" fullWidth margin="normal" onChange={handleChange} required />
                <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} required />
                <TextField label="Contraseña" name="password" type="password" fullWidth margin="normal" onChange={handleChange} required />
                <Button type="submit" variant="contained" color="primary" fullWidth>Registrarse</Button>
            </form>
        </Container>
    );
};

export default Register;
