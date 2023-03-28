const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const SALT_ROUNDS = 10;

const userSchema = new Schema({

firstName: { 
    type: String, 
    required: true 
},

lastName: {
    type: String,
    required: true,
},

username: {
    type: String,
    required: true,
},

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
minlength: 3,
required: true,
},

role: { 
type: String,
trim: true,
required: true,
},

dateAdded: {
    type: Date,
    required: true,
},

contact: {
    type: String,
},

store: {
    type: Schema.Types.ObjectId,
    ref: "Store",
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
