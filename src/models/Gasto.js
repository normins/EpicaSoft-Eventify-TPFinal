import mongoose from "mongoose";

const GastoSchema = new mongoose.Schema({
  concepto: { type: String, required: true },
  monto:    { type: Number, required: true },
  evento:   { type: String, required: true },
  proveedor:{ type: String, required: false },
});

export default mongoose.model("Gasto", GastoSchema);

