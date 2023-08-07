import mongoose from "mongoose";

const Client = new mongoose.Schema({
    Name: {
        required: true,
        type: String
    },
    contacts_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts"
    },
    address_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }
})

export default mongoose.model("Client", Client);