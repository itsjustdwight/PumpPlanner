import express from "express";
import cors from "cors";
import {
  registerUser,
  loginUser,
  authenticateUser
} from "./auth.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import exerciseRoutes from "./exerciseRoutes.js";
import { Exercise } from "./db.js";
import { User } from "./db.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(
    MONGO_CONNECTION_STRING +
      {
        dbName: "pumpplannerdb", // ✅ Explicitly specify database name
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
  )
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

//Middleware
app.use(express.json());
app.use(cors());

//get exercises
app.get("/exercises", async (req, res) => {
  try {
    const exercises = await Exercise.find({});
    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//new user
app.post("/signup", registerUser);
//existing user
app.post("/login", loginUser);

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  User.addUser(userToAdd).then((result) =>
    res.status(201).send(result)
  );
});

app.use("/api", exerciseRoutes);

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
