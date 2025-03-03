import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

if (!MONGO_CONNECTION_STRING) {
  throw new Error("MongoDB connection string is missing.");
}

if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: "majority" },
    })
    .then(() => console.log("Connected to MongoDB!"))
    .catch((error) => console.error("MongoDB Connection Error:", error));
}

// ✅ Define the Exercise Schema
const exerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  weight: String,
  difficulty: String,
});

// ✅ Create and Export the Model
const Exercise = mongoose.model("Exercise", exerciseSchema);

export { mongoose, Exercise }; // ✅ Ensure Exercise is exported