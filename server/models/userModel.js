import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add your name"],
            trim: true,
            maxLength: [20, "Your name is up to 20 chars long."],
        },
        account: {
            type: String,
            required: [true, "Please add your email"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add your password"],
        },
        avatar: {
            type: String,
            default:
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        },
        role: {
            type: String,
            default: "user", // admin
        },
        type: {
            type: String,
            default: "register", // login
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
