import { fetchExercises } from "./fetchExercises.js";
import { Exercise } from "./db.js";

async function saveExercisesToDB() {
  let exercises = [];
  let attempts = 0;
  const maxRetries = 3; // Retry up to 3 times

  while (exercises.length === 0 && attempts < maxRetries) {
    attempts++;
    console.log(`Attempt ${attempts}: Fetching exercises...`);
    
    exercises = await fetchExercises();

    if (exercises.length === 0) {
      console.log(`Waiting before retrying (attempt ${attempts})...`);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
    }
  }

  if (exercises.length === 0) {
    console.log("No exercises found after multiple attempts. Exiting...");
    return;
  }

  try {
    await Exercise.insertMany(exercises);
    console.log(`Successfully saved ${exercises.length} exercises to MongoDB.`);
  } catch (error) {
    console.error("Error saving exercises to database:", error.message);
  }
}

saveExercisesToDB();