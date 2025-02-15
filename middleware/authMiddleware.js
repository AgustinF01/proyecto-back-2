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

            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 86400000 }); // 1 día

            if (!req.user) {
                return res.status(401).json({ message: "Usuario no encontrado" });
            }

            next();
        } else {
            return res.status(401).json({ message: "No autorizado, token no presente" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

exports.protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

// Middleware para verificar si el usuario es ADMIN
exports.adminOnly = (req, res, next) => {
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
