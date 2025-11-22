// src/middleware/verifyToken.js
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  let token = null;

  // 1) Intentar leer de Authorization: Bearer xxxx
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const parts = authHeader.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  // 2) Si no hay header, probamos cookie "token"
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).send("No autorizado: no hay token");
  }

  const secret = process.env.JWT_SECRET || "super_secreto_para_parcial";

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido o expirado");
    }

    req.user = decoded; // datos que pusimos en el payload
    next();
  });
}
