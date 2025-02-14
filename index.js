require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Conectar a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((error) => console.log("❌ Error en la conexión:", error));

// Rutas
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
