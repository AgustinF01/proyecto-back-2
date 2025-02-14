const express = require("express");
const { crearTurno, obtenerTurnos, asignarProfesor } = require("../controllers/turnoController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, crearTurno); // Usuarios normales crean turnos
router.get("/", protect, obtenerTurnos); // Todos los autenticados pueden ver turnos
router.put("/:id/asignar-profesor", protect, adminOnly, asignarProfesor); // Solo el admin puede asignar profesores

module.exports = router;

