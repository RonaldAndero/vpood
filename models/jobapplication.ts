import mongoose from "mongoose";

const JobApplication = new mongoose.Schema({
    page: {
        type: Number,
        required: true,
    },
    per_page: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    total_pages: {
        type: Number,
        required: true,
    },
    data: [
        {
            id: {
                type: Number,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            first_name: {
                type: String,
                required: true,
            },
            last_name: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                required: false,
            },
        },
    ],
});

export default mongoose.model("JobApplication", JobApplication);