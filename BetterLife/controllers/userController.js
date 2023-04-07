const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/sendEmail");

// Generate Token
/* const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}; */

const updateUserById = async (req,res) => {
  try {
    const user_id = req.params.id;
    const userInDb = await User.findByIdAndUpdate(user_id, req.body, {new:true});
    res.status(201).json(userInDb);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getUserById = async (req, res) => {
  try {
    const user_id = req.params.id;
    const userInDb = await User.findById(user_id).populate("store");
    res.status(201).json(userInDb);
  } catch (err) {
    res.status(500).json(err);
  }
}

const create = async (req, res) => {
  const { password } = req.body;
  if (password.length < 3) {
    return res.status(400).json({ error: "password too short" });
  }

  try {
    const user = await User.create(req.body);
    const payload = { user };
    const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: 3600});
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  if (password.length < 3) {
    return res.status(400).json({message: 'Password must be at least 3 characters'});
  }

  try {
    const user = await User.findOne({email});
    const role = user.role;
    const payload = { user };

    if (user === null) {
      res.status(400).json({message: "User not found"});
      return;

    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        throw new Error(error);
      }

      if (result) {
        const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: 3600});
        res.status(201).json({token, role});
      } else {
        res.status(401).json({message: "Invalid password"});
      }
    });
  } catch(error) {
    res.status(500).json(error);
  }
};

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // fIND tOKEN in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  //Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Reste Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save Token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
      <h2>Hello ${user.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30minutes.</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards...</p>
      <p>BetterLife Team</p>
    `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});


module.exports = {
  create,
  login,
  resetPassword,
  changePassword,
  forgotPassword,
  updateUserById,
  getUserById
};