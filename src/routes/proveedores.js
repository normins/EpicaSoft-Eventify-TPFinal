import express from "express";
import Proveedor from "../models/Proveedor.js";

const r = express.Router();

// GET /api/proveedores?evento=ID → lista (opcionalmente filtrados por evento)
r.get("/", async (req, res) => {
  try {
    const filtro = {};
    if (req.query.evento) {
      filtro.evento = req.query.evento; // ID del evento
    }

    const proveedores = await Proveedor.find(filtro).lean();
    res.json(proveedores);
  } catch (err) {
    console.error("Error al listar proveedores:", err);
    res.status(500).json({ message: "Error al listar proveedores" });
  }
});

// GET /api/proveedores/:id → detalle
r.get("/:id", async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id).lean();
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (err) {
    console.error("Error al obtener proveedor:", err);
    res.status(500).json({ message: "Error al obtener proveedor" });
  }
});

// POST /api/proveedores → crear
r.post("/", async (req, res) => {
  try {
    const { nombre, rubro, telefono, costo, evento } = req.body;

    const nuevo = new Proveedor({
      nombre,
      rubro,
      telefono,
      costo: costo ? Number(costo) : 0,
      evento,
    });

    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    console.error("Error al crear proveedor:", err);
    res
      .status(500)
      .json({ message: "Error al crear proveedor", error: err.message });
  }
});

// PUT /api/proveedores/:id → editar
r.put("/:id", async (req, res) => {
  try {
    const { nombre, rubro, telefono, costo, evento } = req.body;

    const actualizado = await Proveedor.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        rubro,
        telefono,
        costo: costo ? Number(costo) : 0,
        evento,
      },
      { new: true }
    ).lean();

    if (!actualizado) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json(actualizado);
  } catch (err) {
    console.error("Error al actualizar proveedor:", err);
    res
      .status(500)
      .json({ message: "Error al actualizar proveedor", error: err.message });
  }
});

// DELETE /api/proveedores/:id → borrar
r.delete("/:id", async (req, res) => {
  try {
    const borrado = await Proveedor.findByIdAndDelete(req.params.id).lean();
    if (!borrado) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.json({ message: "Proveedor eliminado" });
  } catch (err) {
    console.error("Error al eliminar proveedor:", err);
    res
      .status(500)
      .json({ message: "Error al eliminar proveedor", error: err.message });
  }
});

export default r;
