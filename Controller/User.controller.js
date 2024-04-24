import User from "../Models/User.schema.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import sendEmail from "../Services/emailService.js";
dotenv.config();

// main server api
export const userapi = async (req, res) => {
  try {
    res.status(200).send(`Backend server is working `);
  } catch (error) {
    res.status(500).json({
      error: "Internal server Error",
    });
  }
};

// register user api
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const newuser = new User({ username, email, password: hashpassword });
    await newuser.save();

    res.status(200).json({ message: "Register succesfull" });
  } catch (error) {
    res.status(500).json({
      error: "Internal server Error",
    });
  }
};

// login user api
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "invalid password" });
    }
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
        name: user.name,
      },
      process.env.jwt_secret
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      secure: true,
    });

    res.status(200).json({ message: "login successful" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      error: "Internal server Error",
    });
  }
};

// get user

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-passwordHash -__v -_id");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// logout user api

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// forget password api

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique token for password reset using JWT
    const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Save the token in the user document in MongoDB
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send email with password reset link
    const resetLink = `http://localhost:3000/resetpassword/${user.id}/${token}`;
    await sendEmail(
      email,
      "Password Reset",
      `Hello ${user.username},\n\nPlease click on the following link to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send password reset email" });
  }
};

//reset password api

export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { newPassword } = req.body;

    // Validate token, user ID, and new password
    if (!token || !id || !newPassword) {
      return res
        .status(400)
        .json({ message: "Invalid token, user ID, or new password" });
    }

    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If token exists, it's a password reset request
    if (token) {
      // Check if the reset token matches the one stored in the user document
      if (user.resetToken !== token) {
        return res.status(400).json({ message: "Invalid reset token" });
      }

      // Check if the token has expired
      if (Date.now() > user.resetPasswordExpires) {
        return res.status(400).json({ message: "Token expired" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password and reset token in the database
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      return res.status(200).json({ message: "Password reset successfully" });
    } else {
      // Update password request
      // Verify and decode the reset token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by email
      const user = await User.findOne({ email: decodedToken.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password in the database
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    console.error("Error resetting/updating password:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      res.status(400).json({ message: "Invalid or expired token" });
    } else {
      res.status(500).json({ message: "Failed to reset/update password" });
    }
  }
};


// delete user

export const deleteUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//admin user

export const registerAdminUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const newAdminUser = new User({
      username,
      email,
      password: hashpassword,
      isAdmin: true,
    }); // Set isAdmin to true
    await newAdminUser.save();

    res.status(200).json({ message: "Admin user registered successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Internal server Error",
    });
  }
};
