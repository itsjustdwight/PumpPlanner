import mongoose from "mongoose";
import fs from "fs";
import { Exercise } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

async function saveExercisesToDB() {
  try {
    console.log("🔄 Reading exercises from exercises.json...");

    const data = fs.readFileSync("exercises.json", "utf8");
    const exercises = JSON.parse(data);

    if (!exercises || exercises.length === 0) {
      console.error("❌ No exercises found in JSON file.");
      return;
    }

    console.log(`✅ Found ${exercises.length} exercises. Connecting to MongoDB...`);

    console.log(`🔍 Checking MONGO_CONNECTION_STRING: ${process.env.MONGO_CONNECTION_STRING}`); // Debugging log
    
    // ✅ Explicitly pass database name in connection string
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      dbName: "pumpplannerdb",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    console.log(`✅ Connected to database: ${db.name}`);

    await Exercise.deleteMany({});
    console.log("✅ Old exercises removed. Inserting new exercises...");

    const result = await Exercise.insertMany(exercises);
    console.log(`✅ Successfully inserted ${result.length} exercises!`);

  } catch (error) {
    console.error("❌ Error saving exercises to database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB Connection Closed.")
  }
}

saveExercisesToDB();