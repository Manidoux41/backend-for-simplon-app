
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, email, password, role, phone, address, depot, datePermis, dateEntree, lastMissionNumber, monthlyDriveHours, waitHours, monthlyRestHours } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let userData = { username, email, password: hashedPassword, role, phone, address, depot };
    if (role === 'driver') {
      userData = {
        ...userData,
        datePermis,
        dateEntree,
        lastMissionNumber,
        monthlyDriveHours,
        waitHours,
        monthlyRestHours
      };
    }
    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
