const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const Joi = require('joi');
const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    validate: {
        validator: function (value) {
            const schema = Joi.string().required();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) => 
            `${props.value} is not a valid name. It must be a valid string.`,
    }
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    validate: {
        validator: function (value) {
            const schema = Joi.string().email().required();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) => 
            `${props.value} is not a valid email. It must be a valid email with ...@example.com.`,
    }
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true,
    validate: {
        validator: function(value) {
          const schema = Joi.string().min(3).required();
          const { error } = schema.validate(value);
          return error ? false : true;
        },
        message: props => `${props.value} is not a valid password! A minimum of 3 characters are required!`,
    }
  },
  role: { 
      type: String,
      trim: true,
      default: "Consumer",
      required: true,
      validate: {
        validator: function(value) {
          const schema = Joi.string().required();
          const { error } = schema.validate(value);
          return error ? false : true;
        },
        message: props => `${props.value} is not a valid role term!`,
      }
    },
  dateAdded: {
      type: Date,
      validate: {
            validator: function(value) {
            const schema = Joi.date();
            const { error } = schema.validate(value);
            return error ? false : true;
            },
            message: props => `${props.value} is not a valid date format!`
      },
  },

  contact: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
            const schema = Joi.string();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) => 
            `${props.value} is not a valid contact number. It must be a valid string.`,
      }
  },
  store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
  },
  available: {
      type: "Boolean",
      default: true,
      validate: {
        validator: function (value) {
            const schema = Joi.boolean().required();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) => 
            `${props.value} is not a valid selection for availability. It must be either true or false.`,
      }
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