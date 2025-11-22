import express from "express";
import Gasto from "../models/Gasto.js";

const r = express.Router();

// GET /api/gastos?evento=ID&proveedor=ID   → lista gastos (con filtros opcionales)
r.get("/", async (req, res) => {
  try {
    const filtro = {};
    if (req.query.evento) {
      filtro.evento = req.query.evento; // ID del evento
    }
    if (req.query.proveedor) {
      filtro.proveedor = req.query.proveedor; // ID del proveedor
    }

    const gastos = await Gasto.find(filtro).lean();
    res.json(gastos);
  } catch (err) {
    console.error("Error al listar gastos:", err);
    res.status(500).json({ message: "Error al listar gastos" });
  }
});

// GET /api/gastos/:id → detalle
r.get("/:id", async (req, res) => {
  try {
    const gasto = await Gasto.findById(req.params.id).lean();
    if (!gasto) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }
    res.json(gasto);
  } catch (err) {
    console.error("Error al obtener gasto:", err);
    res.status(500).json({ message: "Error al obtener gasto" });
  }
});

// POST /api/gastos → crear
r.post("/", async (req, res) => {
  try {
    const { concepto, monto, evento, proveedor } = req.body;

    const nuevo = new Gasto({
      concepto,
      monto: monto ? Number(monto) : 0,
      evento,     // acá viene el ID del evento
      proveedor,  // y acá el ID del proveedor (opcional)
    });

    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    console.error("Error al crear gasto:", err);
    res
      .status(500)
      .json({ message: "Error al crear gasto", error: err.message });
  }
});

// PUT /api/gastos/:id → editar
r.put("/:id", async (req, res) => {
  try {
    const { concepto, monto, evento, proveedor } = req.body;

    const actualizado = await Gasto.findByIdAndUpdate(
      req.params.id,
      {
        concepto,
        monto: monto ? Number(monto) : 0,
        evento,
        proveedor,
      },
      { new: true }
    ).lean();

    if (!actualizado) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    res.json(actualizado);
  } catch (err) {
    console.error("Error al actualizar gasto:", err);
    res
      .status(500)
      .json({ message: "Error al actualizar gasto", error: err.message });
  }
});

// DELETE /api/gastos/:id → borrar
r.delete("/:id", async (req, res) => {
  try {
    const borrado = await Gasto.findByIdAndDelete(req.params.id).lean();
    if (!borrado) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }
    res.json({ message: "Gasto eliminado" });
  } catch (err) {
    console.error("Error al eliminar gasto:", err);
    res
      .status(500)
      .json({ message: "Error al eliminar gasto", error: err.message });
  }
});

export default r;

