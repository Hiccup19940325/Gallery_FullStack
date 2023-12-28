import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            text: true,
        },
        image: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        owner: {
            type: String,
            required: true,
        }
    },
    { timestamps: true });

export default mongoose.model("Blog", blogSchema);
