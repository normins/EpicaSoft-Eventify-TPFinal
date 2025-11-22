
import mongoose from "mongoose";

const ProveedorSchema = new mongoose.Schema({
  nombre:   { type: String, required: true },
  rubro:    { type: String, required: false },
  telefono: { type: String, required: false },
  costo:    { type: Number, default: 0 },
  evento:   { type: String, required: false },
});

export default mongoose.model("Proveedor", ProveedorSchema);
