import { getEnvVar } from "./getEnvVar.js";

export class UserProvider {
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
        const collectionName = getEnvVar("USERS_COLLECTION_NAME");
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    async findByUsername(username) {
        return this.collection.findOne({ username });
    }

   async createUser(username, email, hashedPassword) {
    console.log("Writing to database:", this.mongoClient.db().databaseName);
    console.log("Writing to collection:", this.collection.collectionName);
    const result = await this.collection.insertOne({
        username,
        email,
        password: hashedPassword
    });
    console.log("Insert result:", result);
    return result.insertedId;
}
}
