import mongoose from "mongoose";

const Billrow = new mongoose.Schema({
    total: {
        required: true,
        type: Number
    },
    product_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
})

export default mongoose.model("Billrow", Billrow);