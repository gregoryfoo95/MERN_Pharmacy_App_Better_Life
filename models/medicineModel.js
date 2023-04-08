const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require('joi');

const medicineSchema = new Schema({
    brand: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid brand name. It must be a valid string.`,
        }
    },
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid medicine name. It must be a valid string.`,
        }
    },

    type: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid medicine type. It must be a valid string.`,
        }
    },

    country: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid country name. It must be a valid string.`,
        }
    },

    routeOfAdmin: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid route of administration term. It must be a valid string.`,
        }
    },

    strength: {
        type: String,
        default: "0",
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid medicine strength. It must be a valid string.`,
        }
    },

    price: {
        type: Number,
        default: 0,
        required: true,
        validate: {
        validator: function (value) {
            const schema = Joi.number().min(0).required();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) =>
            `${props.value} is not a valid price amount. Must be greater than or equals to 0.`,
        },
    },

    expiry_date: {
        type: Date,
        default: Date.now(),
        required: true,
        validate: {
            validator: function(value) {
            const schema = Joi.date().required();
            const { error } = schema.validate(value);
            return error ? false : true;
            },
            message: props => `${props.value} is not a valid date format!`
        },
        
    }
},

{
    timestamps: true,
},
)
module.exports = mongoose.model("Medicine", medicineSchema);