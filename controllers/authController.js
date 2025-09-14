const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { status, messages } = require('../utils/index');
const nodemailer = require("nodemailer");


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

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(status.BadRequest).json({ message: messages.EMAIL_REQUIRE });

    const user = await User.findOne({ email });
    if (!user) return res.status(status.NotFound).json({ message: messages.USER_NOT_FOUND });

    // Create reset token
    const resetLink = `${process.env.FRONTEND_URL}/reset-password`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Reset Your Password - Furniture Support",
      html: `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:0 auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
    <div style="background:#4CAF50; padding:16px; text-align:center; color:#fff;">
      <h2 style="margin:0;">Furniture Support</h2>
    </div>
    <div style="padding:24px;">
      <p>Hi <strong>${user.firstName || "User"}</strong>,</p>
      <p>We received a request to reset the password for your account.</p>
      <p style="text-align:center; margin:30px 0;">
        <a href="${resetLink}" style="background:#4CAF50; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-size:16px; display:inline-block;">Reset Password</a>
      </p>
      <p>If the button above doesn’t work, copy and paste the link below into your browser:</p>
      <p><strong>Note:</strong> This link is valid for 15 minutes. After that, you’ll need to request a new password reset.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
      <p>Best regards,<br/>Furniture Support Team</p>
    </div>
    <div style="background:#f5f5f5; padding:12px; text-align:center; font-size:12px; color:#888;">
      &copy; ${new Date().getFullYear()} Furniture Support. All rights reserved.
    </div>
  </div>
  `,
    });

    res.status(status.OK).json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(status.InternalServerError).json({ error: "Server error (Forgot Password)" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(status.BadRequest).json({ message: "User not found" });
    }

    if (!password) {
      return res.status(status.BadRequest).json({ message: "Password is required" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword })

    res.status(status.OK).json({ message: messages.PASSWORD_RESET_SUCCESSFULL });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(status.InternalServerError).json({ error: "Server error (Reset Password)" });
  }
};

// Vendor Registration API
exports.registerVendor = async (req, res) => {
  try {
    const {
      bussinessName,
      GSTIN,
      industrySegment,
      addressLineOne,
      addressLineTwo,
      postalCode,
      firstName,
      surname,
      email,
      mobile,
      password,
    } = req.body;

    // Validate input
    if (
      !bussinessName ||
      !addressLineOne ||
      !firstName ||
      !surname ||
      !email ||
      !mobile ||
      !password
    ) {
      return res.status(status.BadRequest).json({ message: "All required fields must be filled" });
    }

    // Check if email or mobile already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(status.BadRequest).json({ message: messages.VENDOR_ALREADY_EXISTS });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create vendor
    const vendor = new User({
      bussinessName,
      GSTIN,
      industrySegment,
      addressLineOne,
      addressLineTwo,
      postalCode,
      firstName,
      surname,
      email,
      mobile,
      password: hashedPassword,
      role: "Vendor",
    });

    await vendor.save();

    res.status(status.OK).json({
      message: messages.VENDOR_REGISTERED_SUCCESSFULLY,
      user: {
        id: vendor._id,
        bussinessName: vendor.bussinessName,
        email: vendor.email,
        mobile: vendor.mobile,
        role: vendor.role,
      },
    });
  } catch (err) {
    console.error("Vendor registration error:", err);
    res.status(status.InternalServerError).json({ error: "Server error: (RegisterVendor) " + err.message });
  }
};

// Update User by ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, surname, email, mobile, gender, aboutUs, password } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(status.NotFound).json({ message: messages.USER_NOT_FOUND });
    }

    let hashedPassword
    if (password && password.length > 0) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update allowed fields
    user.firstName = firstName || user.firstName;
    user.surname = surname || user.surname;
    user.mobile = mobile || user.mobile;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.aboutUs = aboutUs || user.aboutUs;
    user.password = hashedPassword || user.password;

    await user.save();

    res.status(status.OK).json({
      message: messages.USER_UPDATED_SUCCESSFULLY,
      user: {
        id: user._id,
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        aboutUs: user.aboutUs,
      },
    });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(status.InternalServerError).json({
      message: "Server error during user update.",
      error: err.message,
    });
  }
};
