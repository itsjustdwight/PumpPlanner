import { Exercise } from "./db.js";

export async function getExercises(req, res) {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving exercise", error });
  }
}
