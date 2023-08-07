import mongoose from "mongoose";

const Bill = new mongoose.Schema({
    date: {
        required: true,
        type: Date
    },
    total: {
        required: true,
        type: Number
    },
    bill_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    },
    billrow_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Billrow"
    },
    client_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    }
})

export default mongoose.model("Bill", Bill);