const mongoose = require("mongoose");

const TurnoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relación con Usuario
    profesor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Relación con Profesor
    dias: [{ type: String, enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] }],
    creadoEn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Turno", TurnoSchema);
