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
  username: {
    type: String,
    required: true,
    unique: true,  // you can remove 'unique' if you don't want uniqueness enforced
  },
  email: {
    type: String,
    required: true,
    unique: true,  // recommended to avoid duplicate user emails
  },
  password: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  age: {
    type: Number,
    default: 0,
  },
  buildType: {
    type: String,
    enum: ["fat", "average", "fit", "unspecified"],
    default: "unspecified",
  },
  preferredExerciseFrequency: {
    type: Number,
    default: 3,
  },
  // You can store a routine in many ways. For example:
  weeklyRoutine: {
    monday: [{ exerciseId: String, sets: Number, reps: Number }],
    tuesday: [{ exerciseId: String, sets: Number, reps: Number }],
    wednesday: [{ exerciseId: String, sets: Number, reps: Number }],
    thursday: [{ exerciseId: String, sets: Number, reps: Number }],
    friday: [{ exerciseId: String, sets: Number, reps: Number }],
    saturday: [{ exerciseId: String, sets: Number, reps: Number }],
    sunday: [{ exerciseId: String, sets: Number, reps: Number }],
  },
  // Or simply an array of exercises user is tracking:
  // exercises: [{
  //   exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  //   sets: Number,
  //   reps: Number
  // }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export { mongoose, Exercise, User };