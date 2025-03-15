// SignUp.jsx
import { useState } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [buildType, setBuildType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://pumplanner-abfaftgqbdfnaxbn.westus-01.azurewebsites.net///signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            pwd,
            age: Number(age), // or parseInt, parseFloat as needed
            weight: Number(weight),
            height: Number(height),
            buildType
          })
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const data = await response.json();
      console.log("Sign-up success:", data);
      // data might include { message: "...", token: "..." }

      // Possibly store token in localStorage, redirect, etc.
      // localStorage.setItem("token", data.token);

      // Reset form or navigate away
    } catch (err) {
      console.error("Sign-up failed:", err);
      // Show user-friendly error
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <label>
          Build Type:
          <select
            value={buildType}
            onChange={(e) => setBuildType(e.target.value)}>
            <option value="ectomorph">Ectomorph</option>
            <option value="mesomorph">Mesomorph</option>
            <option value="endomorph">Endomorph</option>
            <option value="unspecified">Unspecified</option>
          </select>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
