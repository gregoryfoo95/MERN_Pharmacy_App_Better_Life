const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true,
  },
  role: { 
      type: String,
      trim: true,
    },
  dateAdded: {
      type: Date,
  },
  contact: {
      type: String,
  },
  store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
  },
  available: {
      type: Boolean,
  }
},
{ 
    timestamps: true,

    toJSON: {
        transform: function(doc, ret) {
        delete ret.password;
        return ret;
        }
    }
});

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("User", userSchema);