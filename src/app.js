// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import eventoRoutes from "./routes/eventos.js";
import proveedorRoutes from "./routes/proveedores.js";
import invitadoRoutes from "./routes/invitados.js";
import gastoRoutes from "./routes/gastos.js";
import { verifyToken } from "./middleware/verifyToken.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/img", express.static(path.join(__dirname, "..", "img")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Inicio → login
app.get("/", (req, res) => res.redirect("/login"));

// Vista del login
app.get("/login", (req, res) => res.render("auth/login"));

// 🔒 Panel protegido por token
app.get("/panel", verifyToken, (req, res) => {
  res.render("panel", { user: req.user });
});

// Vista  de eventos
app.get("/panel/eventos", verifyToken, (req, res) => {
  res.render("eventos/index", { user: req.user });
});

// Proveedores
app.get("/panel/proveedores", verifyToken, (req, res) => {
  res.render("proveedores/index", { user: req.user });
});

// Invitados
app.get("/panel/invitados", verifyToken, (req, res) => {
  res.render("invitados/index", { user: req.user });
});

// Gastos
app.get("/panel/gastos", verifyToken, (req, res) => {
  res.render("gastos/index", { user: req.user });
});


// Logout: borra cookie y vuelve al login
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/invitados", invitadoRoutes);
app.use("/api/gastos", gastoRoutes);

export default app;
