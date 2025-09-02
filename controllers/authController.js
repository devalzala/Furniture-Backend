const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { status, messages } = require('../utils/index');
 

// Login existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(status.BadRequest).json({ message: messages.EMAIL_AND_PASSWORD_REQUIRE });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(status.BadRequest).json({ message: messages.INVALID_EMAIL_OR_PASSWORD });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(status.BadRequest).json({ message: messages.INVALID_EMAIL_OR_PASSWORD });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send response
    res.status(status.OK).json({
      message: messages.LOGIN_SUCCESSFUL,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        dob: user.dob,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(status.InternalServerError).json({ error: "Server error: (Login) " + err.message });
  }
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { firstName, surname, email, dob, mobile, gender, password, role } = req.body;

    // Validate input
    if (!firstName || !surname || !email || !dob || !mobile || !gender || !password) {
      return res.status(status.BadRequest).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(status.BadRequest).json({ message: messages.USER_ALREADY_EXISTS });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      firstName,
      surname,
      email,
      dob,
      mobile,
      gender,
      password: hashedPassword,
      role: role || "User",
    });

    await user.save();

    res.status(status.OK).json({
      message: messages.USER_REGISTERED_SUCCESSFULLY,
      user: {
        id: user._id,
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        dob: user.dob,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(status.InternalServerError).json({ error: "Server error: (Register) " + err.message });
  }
};