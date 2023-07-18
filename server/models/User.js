import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            min: 50,
            max: 100,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        transactions: Array,
        role: {
            type: String,
            enum: ["user", "admin", "leadadmin"],
            default: "admin"
        },
    },
    { timestamps: true } //automatically created and update date for the above
);

const User = mongoose.model("User", UserSchema)
export default User;