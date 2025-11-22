// src/routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";

const r = express.Router();

const USER = {
  email: "admin@eventify.com",
  password: "grupo1",
  name: "Admin Eventify Pro",
};

r.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== USER.email || password !== USER.password) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const payload = {
    email: USER.email,
    name: USER.name,
  };

  const secret = process.env.JWT_SECRET || "super_secreto_para_parcial";
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  // Detectamos si vino de formulario HTML
  const contentType = req.headers["content-type"] || "";
  const accepts = req.headers["accept"] || "";
  const esFormulario =
    contentType.includes("application/x-www-form-urlencoded") &&
    !accepts.includes("application/json");

  if (esFormulario) {
    // Guarda el token en cookie y redirige al panel
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hora
    });
    return res.redirect("/panel");
  }

  // Para Postman / JSON
  return res.json({
    message: "Login exitoso",
    token,
  });
});

export default r;

