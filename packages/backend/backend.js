import express from "express";
import cors from "cors";
import "./auth.js"


const app = express();
const port = 8000;

app.post("/signup", registerUser);

app.post("/login", loginUser);

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  Users.addUser(userToAdd).then((result) =>
    res.status(201).send(result)
  );
});