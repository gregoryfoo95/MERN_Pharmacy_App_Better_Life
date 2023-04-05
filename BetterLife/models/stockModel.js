const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        require: true,
    },
    medicine: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
    },

    quantity: {
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
            `${props.value} is not a valid quantity. Must be greater than or equals to 0.`,
        },
    },

})
module.exports = mongoose.model("Stock", stockSchema);