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
const app = express();
app.use(express.json());

const mongoClient = connectMongo();
await mongoClient.connect();
console.log("Connected to MongoDB!");

const userProvider = new UserProvider(mongoClient);
const pantryProvider = new PantryProvider(mongoClient);
const mealProvider = new MealProvider(mongoClient);

registerAuthRoutes(app, userProvider);
registerPantryRoutes(app, pantryProvider);
registerMealRoutes(app, mealProvider);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}.  CTRL+C to stop.`);
});
