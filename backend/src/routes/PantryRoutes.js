import { verifyAuthToken } from "../verifyAuthToken.js";

export function registerPantryRoutes(app, pantryProvider) {

    app.get("/api/pantry", verifyAuthToken, async (req, res) => {
        const items = await pantryProvider.getPantry(req.userId);
        res.send(items);
    });

    app.post("/api/pantry", verifyAuthToken, async (req, res) => {
        const { name, category, inStock } = req.body;
        if (!name) {
            return res.status(400).send({ error: "Name is required" });
        }
        const result = await pantryProvider.addItem(req.userId, name, category, inStock);
        res.status(201).send(result);
    });

    app.patch("/api/pantry/:id", verifyAuthToken, async (req, res) => {
        const matched = await pantryProvider.updateItem(req.params.id, req.userId, req.body);
        if (!matched) {
            return res.status(404).send({ error: "Item not found" });
        }
        res.status(204).send();
    });

    app.delete("/api/pantry/:id", verifyAuthToken, async (req, res) => {
        const deleted = await pantryProvider.deleteItem(req.params.id, req.userId);
        if (!deleted) {
            return res.status(404).send({ error: "Item not found" });
        }
        res.status(204).send();
    });
}
