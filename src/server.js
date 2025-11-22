import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import mongoose from "mongoose";

const PORT=process.env.PORT || 3000;
const MONGO=process.env.MONGO || "mongodb://localhost/eventify_pro";

mongoose.connect(MONGO).then(()=>{
  console.log("Mongo conectado");
  app.listen(PORT, ()=> console.log("Servidor en puerto",PORT));
}).catch(e=>console.error(e));
