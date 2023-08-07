import mongoose from "mongoose";

const Address = new mongoose.Schema({
    street: {
        required: true,
        type: String
    },
    house: {
        required: true,
        type: Number
    },
    city: {
        required: true,
        type: String
    },
    zip: {
        required: true,
        type: Number
    }
})

export default mongoose.model("Address", Address);