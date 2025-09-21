// backend/src/controllers/authController.js
const { validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: "Invalid input", errors: errors.array() });

  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({ message: "User already exists" });

    const user = await User.create({ username, email, password }); // bcrypt in pre-save
    return res.status(201).json({ id: user._id, username: user.username });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: "Invalid input", errors: errors.array() });

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.compare(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};