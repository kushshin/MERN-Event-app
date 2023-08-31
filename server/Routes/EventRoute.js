import express from 'express';
import jwt from 'jsonwebtoken';
import EventModel from '../models/event.js';
import UserModel from '../models/user.js';
import { verifyToken } from './UserRoute.js'
const router = express.Router()

//get All events
router.get("/", async (req, res) => {
    try {
        const event = await EventModel.find({})
        res.status(200).json(event)
    } catch (error) {
        res.status(401).json("not event found")
    }

})



router.post("/", verifyToken, async (req, res) => {
    try {
        const newEvent = new EventModel(req.body)
        await newEvent.save()
        res.status(200).json("new event created")

    } catch (error) {
        res.status(403).json(error)
    }
})


//saved a event
router.put("/", verifyToken, async (req, res) => {
    try {
        const event = await EventModel.findById(req.body.eventId)
        const user = await UserModel.findById(req.body.userId)
        user.savedEvents.push(event)
        await user.save()
        res.status(200).json({ savedEvents: user.savedEvents })

    } catch (error) {
        res.status(401).json("event not saved")

    }
})


//get id of saved events
router.get("/savedEvents/eventId/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.status(200).json({ savedEvents: user.savedEvents })
    } catch (error) {
        res.status(403).json(error)
    }
})

//get saved Events
router.get("/savedEvent/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const SavedEvents = await EventModel.find({ _id: { $in: user.savedEvents } })
        // const SavedEvents = await UserModel.find({ savedEvents: user.savedEvents })

        res.status(200).json(SavedEvents)

    } catch (error) {
        res.status(403).json(error)
    }
})

router.put("/:id/like", async (req, res) => {
    try {
        const event = await EventModel.findById(req.params.id)
        if (!event.includes(req.body.userId)) {
            await event.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("the post has been liked")
        } else {
            await event.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("the post has been  disliked")
        }


    } catch (error) {
        res.status(401).json(error)
    }
})


export default router

