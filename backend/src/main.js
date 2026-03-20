import express from "express";
import { getEnvVar } from "./getEnvVar.js";
import { connectMongo } from "./connectMongo.js";
import { UserProvider } from "./UserProvider.js";
import { registerAuthRoutes } from "./routes/authRoutes.js";
import { registerPantryRoutes } from "./routes/PantryRoutes.js";
import { PantryProvider } from "./PantryProvider.js";
import { MealProvider } from "./MealProvider.js";
import { registerMealRoutes } from "./routes/mealRoutes.js";

const PORT = Number.parseInt(getEnvVar("PORT", false), 10) || 3000;
const STATIC_DIR = getEnvVar("STATIC_DIR", false) || "public";

const app = express();
app.use(express.json());
app.use(express.static(STATIC_DIR));

const mongoClient = connectMongo();
await mongoClient.connect();
console.log("Connected to MongoDB!");

const userProvider = new UserProvider(mongoClient);
const pantryProvider = new PantryProvider(mongoClient);
const mealProvider = new MealProvider(mongoClient);

registerAuthRoutes(app, userProvider);
registerPantryRoutes(app, pantryProvider);
registerMealRoutes(app, mealProvider);

const VALID_ROUTES = ["/", "/login", "/register", "/supply", "/ideas", "/settings"];
app.get(VALID_ROUTES, (req, res) => {
    res.sendFile("index.html", { root: STATIC_DIR });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}.  CTRL+C to stop.`);
});
