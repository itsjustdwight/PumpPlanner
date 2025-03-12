import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./db.js";

/**
 * Registers a new user.
 * Expects: { firstName, lastName, username, email, pwd }
 * Returns: { message, token }
 */
export async function registerUser(req, res) {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      pwd // password from the client
    } = req.body;

    // 1) Validate required fields
    if (!firstName || !lastName || !username || !email || !pwd) {
      return res.status(400).send("Missing required fields.");
    }

    // 2) Check if user already exists by username or email
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).send("User already exists (username/email).");
    }

    // 3) Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pwd, salt);

    // 4) Create a new User instance
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    // 5) Save to database
    await newUser.save();

    // 6) Generate JWT token
    const token = await generateAccessToken({ userId: newUser._id });

    // 7) Send success response
    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Logs in an existing user.
 * Expects: { username, pwd }
 * Returns: { message, token }
 */
export async function loginUser(req, res) {
  try {
    const { username, pwd } = req.body;

    if (!username || !pwd) {
      return res.status(400).send("Missing username or password.");
    }

    // 1) Find user in DB by username
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(401).send("Unauthorized - username not found.");
    }

    // 2) Compare passwords
    const isMatch = await bcrypt.compare(pwd, foundUser.password);
    if (!isMatch) {
      return res.status(401).send("Unauthorized - incorrect password.");
    }

    // 3) Generate token
    const token = await generateAccessToken({ userId: foundUser._id });

    // 4) Return success with JSON
    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Middleware to authenticate requests using JWT.
 * Expects Authorization: Bearer <token>
 */
export function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send("No token provided.");
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (error) {
        console.log("JWT error:", error);
        return res.status(401).send("Invalid token.");
      }

      // Attach user info (decoded payload) to req if needed
      req.user = decoded; // e.g. { userId: '...', iat: ..., exp: ... }
      next();
    });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).send("Unauthorized");
  }
}

/**
 * Helper function to generate JWT
 * @param {Object} payload - e.g., { userId: "abc123" }
 * @returns {Promise<string>} - signed token
 */
function generateAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }, // 1 day expiry (customize as needed)
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
}
