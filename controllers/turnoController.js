const Turno = require("../models/Turno");
const User = require("../models/User");

exports.asignarProfesor = async (req, res) => {
    try {
        const { teacherId } = req.body; // Cambiar de profesorId a teacherId
        const { id } = req.params;

        // Verificar si el usuario tiene el rol "teacher"
        const teacher = await User.findById(teacherId);
        if (!teacher || teacher.role !== "teacher") {
            return res.status(400).json({ message: "El usuario no es un profesor válido" });
        }

        // Buscar el turno y asignarle el profesor
        const turno = await Turno.findById(id);
        if (!turno) {
            return res.status(404).json({ message: "Turno no encontrado" });
        }

        turno.profesor = teacherId; // Aquí también cambiarlo a teacherId
        await turno.save();

        res.status(200).json({ message: "Profesor asignado correctamente", turno });
    } catch (error) {
        res.status(500).json({ message: "Error al asignar el profesor", error });
    }
};


exports.crearTurno = async (req, res) => {
    try {
        const { dias } = req.body;
        if (!dias || !dias.length) {
            return res.status(400).json({ message: "Debes seleccionar al menos un día" });
        }

        const nuevoTurno = new Turno({
            usuario: req.user.id, // Extraído del token
            dias,
        });

        await nuevoTurno.save();
        res.status(201).json({ message: "Turno creado con éxito", turno: nuevoTurno });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el turno", error });
    }
};

exports.obtenerTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find().populate("usuario", "name email").populate("profesor", "name email");
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los turnos", error });
    }
};
