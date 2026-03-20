import { ObjectId } from "mongodb";
import { getEnvVar } from "./getEnvVar.js";

export class PantryProvider {
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
        const collectionName = getEnvVar("PANTRY_COLLECTION_NAME");
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    getPantry(userId) {
        return this.collection.find({ userId }).toArray();
    }

    addItem(userId, name, category, inStock) {
        return this.collection.insertOne({ userId, name, category, inStock });
    }

    async updateItem(id, userId, fields) {
        const result = await this.collection.updateOne(
            { _id: new ObjectId(id), userId },
            { $set: fields }
        );
        return result.matchedCount;
    }

    async deleteItem(id, userId) {
        const result = await this.collection.deleteOne(
            { _id: new ObjectId(id), userId }
        );
        return result.deletedCount;
    }
}
