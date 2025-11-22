import express from "express";
import Evento from "../models/Evento.js"; // ajustá el import si tu modelo se llama distinto

const r = express.Router();

// GET /api/eventos  → lista todos
r.get("/", async (req, res) => {
  try {
    const eventos = await Evento.find().lean();
    res.json(eventos);
  } catch (err) {
    console.error("Error al listar eventos:", err);
    res.status(500).json({ message: "Error al listar eventos" });
  }
});

// GET /api/eventos/:id  → detalle de un evento
r.get("/:id", async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).lean();
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.json(evento);
  } catch (err) {
    console.error("Error al obtener evento:", err);
    res.status(500).json({ message: "Error al obtener evento" });
  }
});

// POST /api/eventos  → crear
r.post("/", async (req, res) => {
  try {
    const { nombre, fecha, lugar, presupuesto } = req.body;

    const nuevo = new Evento({
      nombre,
      fecha,
      lugar,
      presupuesto: presupuesto ? Number(presupuesto) : 0,
    });

    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    console.error("Error al crear evento:", err);
    res.status(500).json({ message: "Error al crear evento", error: err.message });
  }
});

// PUT /api/eventos/:id  → editar
r.put("/:id", async (req, res) => {
  try {
    const { nombre, fecha, lugar, presupuesto } = req.body;

    const actualizado = await Evento.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        fecha,
        lugar,
        presupuesto: presupuesto ? Number(presupuesto) : 0,
      },
      { new: true } // devuelve el actualizado
    ).lean();

    if (!actualizado) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json(actualizado);
  } catch (err) {
    console.error("Error al actualizar evento:", err);
    res.status(500).json({ message: "Error al actualizar evento", error: err.message });
  }
});

// DELETE /api/eventos/:id  → borrar
r.delete("/:id", async (req, res) => {
  try {
    const borrado = await Evento.findByIdAndDelete(req.params.id).lean();
    if (!borrado) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.json({ message: "Evento eliminado" });
  } catch (err) {
    console.error("Error al eliminar evento:", err);
    res.status(500).json({ message: "Error al eliminar evento", error: err.message });
  }
});

export default r;
