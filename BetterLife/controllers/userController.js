const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
                res.status(201).json(token);
            } else {
                res.status(401).json({message: "Invalid password"});
            }
        })
        

    } catch(error) {
        res.status(500).json(error);
    }
}
module.exports = {
  create,
  login,
};