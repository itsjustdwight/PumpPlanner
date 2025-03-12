import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const MONGO_URI = process.env.MONGO_CONNECTION_STRING;

async function testMongoDBConnection() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

testMongoDBConnection();