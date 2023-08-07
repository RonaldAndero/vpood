import mongoose from "mongoose";

const Product = new mongoose.Schema({
    Name: {
        required: true,
        type: String
    },
    Price: {
        required: true,
        type: Number
    },
    picture_url: {
        required: true,
        type: String
    },
    active: {
        required: true,
        type: Boolean
    },
    stock: {
        required: true,
        type: Number
    },
    expire_date: {
        required: true,
        type: Number
    },
    category_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }

})

export default mongoose.model("Product", Product);