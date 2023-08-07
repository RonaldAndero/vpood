import mongoose from "mongoose";

const Contacts = new mongoose.Schema({
    phone_number: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    }

})

export default mongoose.model("Contacts", Contacts);