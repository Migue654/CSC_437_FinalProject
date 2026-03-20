import jwt from "jsonwebtoken";
import { getEnvVar } from "./getEnvVar.js";

const JWT_SECRET = getEnvVar("JWT_SECRET");

export function verifyAuthToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).send({ error: "Invalid or expired token" });
    }
}
