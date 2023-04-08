const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const appointmentBooked = asyncHandler(async (req, res) => {
  const { subject, message, send_to, sent_from } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  //   Validation
  if (!subject || !message || !send_to || !sent_from) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const reply_to = user.email;
  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

module.exports = {
  appointmentBooked,
};
