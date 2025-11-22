
import mongoose from "mongoose";

const InvitadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email:  { type: String, required: true },
  evento: { type: String, required: false },
  estado: { 
    type: String,
    enum: ["pendiente", "confirmado", "rechazado"],
    default: "pendiente"
  }
});

export default mongoose.model("Invitado", InvitadoSchema);
