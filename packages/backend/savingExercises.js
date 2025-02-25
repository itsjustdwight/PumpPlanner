import { Exercise } from "./db.js";
import fetchExercises from "./fetchExercises.js";

async function saveExercisesToDB() {
    const exercises = await fetchExercises();
    try {
        await Exercise.insertMany(exercises);
        console.log("Exercise(s) saved to database successfully.");
    } catch (error) {
        console.error("Error saving exercises to database:", error);
    }
}

saveExercisesToDB();