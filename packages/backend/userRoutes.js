// userRoutes.js
import express from "express";
import { User } from "./db.js";
import { authenticateUser } from "./auth.js";

const router = express.Router();

/**
 * @route   GET /users/me
 * @desc    Get the currently authenticated user's info
 * @access  Private (Requires token)
 */
router.get("/me", authenticateUser, async (req, res) => {
  try {
    // `req.user` is set by your authenticateUser middleware
    const user = await User.findById(req.user._id).select(
      "-password"
    );
    // `-password` excludes the password field from the returned data

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @route   PUT /users/me
 * @desc    Update the currently authenticated user's info
 * @access  Private (Requires token)
 */
router.put("/me", authenticateUser, async (req, res) => {
  try {
    // With authenticateUser, we have req.user set
    const userId = req.user._id;

    // Build up the fields that can be updated
    const {
      username,
      email,
      weight,
      height,
      age,
      buildType,
      preferredExerciseFrequency,
      weeklyRoutine
    } = req.body;

    // Optionally you can validate or sanitize fields here

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        weight,
        height,
        age,
        buildType,
        preferredExerciseFrequency,
        weeklyRoutine
      },
      { new: true } // returns the updated user
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @route   GET /users/:id
 * @desc    Get user data by ID (Public or private, up to you)
 * @access  Possibly Public
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add additional routes (e.g. DELETE user, or route for updating routine only, etc.)

export default router;
