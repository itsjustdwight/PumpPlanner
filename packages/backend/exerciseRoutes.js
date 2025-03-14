import express from "express";
import { getExercises } from "./exerciseController.js";

const router = express.Router();

router.get("/exercises", getExercises);

export default router;
