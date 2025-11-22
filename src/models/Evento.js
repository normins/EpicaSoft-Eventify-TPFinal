
import mongoose from "mongoose";

const EventoSchema=new mongoose.Schema({
  nombre:{ type: String, required: true },
  fecha: { type: String, required: true },
  lugar: { type: String, required: true },
  presupuesto:{ type: Number, required: true },
  proveedores:[{type:mongoose.Schema.Types.ObjectId, ref:"Proveedor"}],
  invitados:[{type:mongoose.Schema.Types.ObjectId, ref:"Invitado"}],
  gastos:[{type:mongoose.Schema.Types.ObjectId, ref:"Gasto"}]
});

export default mongoose.model("Evento", EventoSchema);
