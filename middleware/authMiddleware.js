const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
    let token;
    try {
        // Verifica si el token viene en el header de autorización
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]; // Extrae el token después de "Bearer"
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica el token

            // Busca al usuario en la base de datos sin devolver la contraseña
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "Usuario no encontrado" });
            }

            next(); // Pasa al siguiente middleware o controlador
        } else {
            return res.status(401).json({ message: "No autorizado, token no presente" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

// Middleware para verificar si el usuario es ADMIN
exports.adminOnly = (req, res, next) => {
    console.log("Usuario autenticado:", req.user); // <-- Agregar esto para depurar

    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Acceso denegado, solo para administradores" });
    }
};

// Middleware para verificar si el usuario es PROFESOR
exports.profesorOnly = (req, res, next) => {
    if (req.user && req.user.role === "teacher") {
        next();
    } else {
        return res.status(403).json({ message: "Acceso denegado, solo para profesores" });
    }
};
