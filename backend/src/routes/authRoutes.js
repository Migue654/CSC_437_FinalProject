import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../getEnvVar.js";

const JWT_SECRET = getEnvVar("JWT_SECRET");

export function registerAuthRoutes(app, userProvider) {

    app.post("/api/auth/register", async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({ error: "All fields are required" });
        }

        const existing = await userProvider.findByUsername(username);
        if (existing) {
            return res.status(409).send({ error: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const userId = await userProvider.createUser(username, email, hashedPassword);

        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
        res.status(201).send({ token, username });
    });

    app.post("/api/auth/login", async (req, res) => {
        const { username, password } = req.body;

        const user = await userProvider.findByUsername(username);
        if (!user) {
            return res.status(401).send({ error: "Invalid username or password" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
        res.send({ token, username });
    });
}
