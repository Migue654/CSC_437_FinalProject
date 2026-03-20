import { ObjectId } from "mongodb";
import { getEnvVar } from "./getEnvVar.js";

export class MealProvider {
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
        const collectionName = getEnvVar("MEALS_COLLECTION_NAME");
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    getMeals(userId) {
        return this.collection.find({ userId }).toArray();
    }

    addMeal(userId, name, ingredients) {
        return this.collection.insertOne({ userId, name, ingredients });
    }

    async deleteMeal(id, userId) {
        const result = await this.collection.deleteOne(
            { _id: new ObjectId(id), userId }
        );
        return result.deletedCount;
    }
}
