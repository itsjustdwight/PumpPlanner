// db.js
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

// ========== EXERCISE SCHEMA & MODEL ==========
const exerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  weight: String,
  difficulty: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

// ========== USER SCHEMA & MODEL ==========
// Define a schema for your users
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // optional but recommended
  },
  email: {
    type: String,
    required: true,
    unique: true, // optional but recommended
  },
  password: {
    type: String,
    required: true,
  },
  // optional fields like age, weight, etc.
  // ...
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export { mongoose, Exercise, User };