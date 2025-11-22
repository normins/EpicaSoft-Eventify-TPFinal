import express from "express";
import Invitado from "../models/Invitado.js";

const r = express.Router();

// GET /api/invitados?evento=ID  → lista (filtro opcional por evento)
r.get("/", async (req, res) => {
  try {
    const filtro = {};
    if (req.query.evento) {
      filtro.evento = req.query.evento; // ID del evento
    }

    const invitados = await Invitado.find(filtro).lean();
    res.json(invitados);
  } catch (err) {
    console.error("Error al listar invitados:", err);
    res.status(500).json({ message: "Error al listar invitados" });
  }
});

// GET /api/invitados/:id  → detalle
r.get("/:id", async (req, res) => {
  try {
    const invitado = await Invitado.findById(req.params.id).lean();
    if (!invitado) {
      return res.status(404).json({ message: "Invitado no encontrado" });
    }
    res.json(invitado);
  } catch (err) {
    console.error("Error al obtener invitado:", err);
    res.status(500).json({ message: "Error al obtener invitado" });
  }
});

// POST /api/invitados  → crear
r.post("/", async (req, res) => {
  try {
    const { nombre, email, estado, evento } = req.body;

    const nuevo = new Invitado({
      nombre,
      email,
      estado: estado || "pendiente",
      evento, // acá viene el ID de evento
    });

    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    console.error("Error al crear invitado:", err);
    res
      .status(500)
      .json({ message: "Error al crear invitado", error: err.message });
  }
});

// PUT /api/invitados/:id  → editar
r.put("/:id", async (req, res) => {
  try {
    const { nombre, email, estado, evento } = req.body;

    const actualizado = await Invitado.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        email,
        estado,
        evento,
      },
      { new: true }
    ).lean();

    if (!actualizado) {
      return res.status(404).json({ message: "Invitado no encontrado" });
    }

    res.json(actualizado);
  } catch (err) {
    console.error("Error al actualizar invitado:", err);
    res
      .status(500)
      .json({ message: "Error al actualizar invitado", error: err.message });
  }
});

// DELETE /api/invitados/:id  → borrar
r.delete("/:id", async (req, res) => {
  try {
    const borrado = await Invitado.findByIdAndDelete(req.params.id).lean();
    if (!borrado) {
      return res.status(404).json({ message: "Invitado no encontrado" });
    }
    res.json({ message: "Invitado eliminado" });
  } catch (err) {
    console.error("Error al eliminar invitado:", err);
    res
      .status(500)
      .json({ message: "Error al eliminar invitado", error: err.message });
  }
});

export default r;




