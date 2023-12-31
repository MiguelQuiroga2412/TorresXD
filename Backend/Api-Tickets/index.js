// const express = require("express");

import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import cors from "cors"

/* Creando una instancia del framework express. */
const app = express();

/* Esta es una forma de establecer el número de puerto para el servidor. */
dotenv.config();

/* Un middleware que analiza el cuerpo de la solicitud y lo pone a disposición en la propiedad
req.body. */
app.use(express.json());

/* Conexión a la base de datos. */
conectarDB();

/* Una forma de permitir que el frontend acceda al backend. */
const listaBlanca = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if (listaBlanca.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de permiso Cors"));
    }
  },
}
app.use(cors(corsOptions));

/* Una forma de crear rutas. */
app.use("/api/usuarios", usuariosRoutes);

/* Una forma de establecer el número de puerto para el servidor. */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
