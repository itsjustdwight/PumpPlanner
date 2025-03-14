import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables

const API_URL = "https://api.api-ninjas.com/v1/exercises";
const API_KEY = process.env.NINJAS_API_KEY; // Make sure to set this in your .env file

console.log("Using API Key:", API_KEY); // Debugging line

async function fetchExercises() {
  try {
    console.log(`🔄 Fetching exercises from API Ninjas...`);

    const response = await axios.get(API_URL, {
      headers: { "X-Api-Key": API_KEY }
    });

    const exercises = response.data;

    if (!exercises || exercises.length === 0) {
      console.error("❌ No exercises returned from API.");
      return;
    }

    console.log(
      `✅ Successfully fetched ${exercises.length} exercises! Saving to file...`
    );

    fs.writeFileSync(
      "exercises.json",
      JSON.stringify(exercises, null, 2)
    );

    console.log("✅ Exercises saved to exercises.json!");
  } catch (error) {
    console.error("❌ Error fetching exercises:", error);
  }
}

export default fetchExercises();
