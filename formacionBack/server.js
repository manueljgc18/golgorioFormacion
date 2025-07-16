const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// Login
app.post('/api/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  const user = await prisma.usuario.findUnique({
    where: { usuario }
  });

  if (user && user.contrasena === contrasena) {
    res.json({ exito: true, mensaje: 'Inicio de sesión exitoso', usuario });
  } else {
    res.status(401).json({ exito: false, mensaje: 'Usuario o contraseña incorrectos' });
  }
});

// Registro
app.post('/api/registro', async (req, res) => {
  const { usuario, contrasena } = req.body;

  const existe = await prisma.usuario.findUnique({ where: { usuario } });

  if (existe) {
    return res.status(409).json({ exito: false, mensaje: 'El usuario ya existe' });
  }

  const nuevoUsuario = await prisma.usuario.create({
    data: { usuario, contrasena }
  });

  res.json({ exito: true, mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario.usuario });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
