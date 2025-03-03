import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables

const API_URL = "https://exercisedb.p.rapidapi.com/exercises";
const API_KEY = process.env.EXERCISE_API_KEY; // ✅ Use API Key

console.log("Using API Key:", API_KEY); // Debugging line

export async function fetchExercises() {
  try {
    if (!API_KEY) {
      throw new Error("API key is missing. Check your .env file.");
    }

    const response = await axios.get(API_URL, {
      headers: {
        "X-RapidAPI-Key": API_KEY, // ✅ Ensure the API key is sent
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
      params: { limit: 10 },
    });

    console.log(`Successfully fetched ${response.data.length} exercises.`);
    return response.data;
  } catch (error) {
    console.error("Error obtaining exercise:", error.response?.data || error.message);
    return [];
  }
}