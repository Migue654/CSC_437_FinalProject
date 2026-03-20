import { verifyAuthToken } from "../verifyAuthToken.js";

export function registerMealRoutes(app, mealProvider) {

    app.get("/api/meals", verifyAuthToken, async (req, res) => {
        const meals = await mealProvider.getMeals(req.userId);
        res.send(meals);
    });

    app.post("/api/meals", verifyAuthToken, async (req, res) => {
        const { name, ingredients } = req.body;
        if (!name) {
            return res.status(400).send({ error: "Name is required" });
        }
        const result = await mealProvider.addMeal(req.userId, name, ingredients);
        res.status(201).send(result);
    });

    app.delete("/api/meals/:id", verifyAuthToken, async (req, res) => {
        const deleted = await mealProvider.deleteMeal(req.params.id, req.userId);
        if (!deleted) {
            return res.status(404).send({ error: "Meal not found" });
        }
        res.status(204).send();
    });
}
