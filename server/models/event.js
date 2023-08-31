import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,

    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ""
    },
    desc: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    EventOwners: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
},
    { timestamps: true }

)


const EventModel = mongoose.model("event", EventSchema)

export default EventModel