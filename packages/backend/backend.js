import express from "express";
import cors from "cors";
import "./auth.js";
import dotenv from "dotenv";
import mongoose from "mongoose"
import exerciseRoutes from "./exerciseRoutes.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "exercises") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

//Middleware
app.use(express.json());
app.use(cors());

//new user
app.post("/signup", registerUser);
//existing user
app.post("/login", loginUser);

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  Users.addUser(userToAdd).then((result) =>
    res.status(201).send(result)
  );
});

app.use("/api", exerciseRoutes)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})