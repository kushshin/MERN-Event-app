import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }]
})


const UserModel = mongoose.model("users", userSchema)

export default UserModel