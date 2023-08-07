import mongoose from "mongoose";

const Category = new mongoose.Schema({
    Name: {
        required: true,
        type: String
    }
})

export default mongoose.model("Category", Category);