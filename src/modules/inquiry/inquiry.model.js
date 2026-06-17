import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            default: null,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "contacted",
                "completed",
                "cancelled",
            ],
            default: "pending",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


inquirySchema.index({ phone: 1 });
inquirySchema.index({ createdAt: -1 });

const Inquiry = mongoose.model(
    "Inquiry",
    inquirySchema
);

export default Inquiry;