import mongoose from "mongoose";

const Payment = new mongoose.Schema({
    payment_status: {
        required: true,
        type: Boolean
    },
    payment_date: {
        required: true,
        type: Date
    },
    paid_amount: {
        required: true,
        type: Number
    },
    maksmis_kuupaev: {
        required: true,
        type: Date
    }

})

export default mongoose.model("Payment", Payment);