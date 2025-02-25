import axios from "axios";

const API_URL = "https://exercisedb.p.rapidapi.com/exercises";
const API_KEY = "6ac74abd66msh30329666b27a537p1a469cjsne0877f94fa3e";

async function fetchExercises() {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                "X-RapidAPI-Key": API_KEY,  // Your API key
                "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error obtaining exercise:", error)
    }
}

fetchExercises();