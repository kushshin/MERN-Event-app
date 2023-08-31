import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt'
const router = express.Router()


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await UserModel.findOne({ username: username })
        if (user) res.status(401).json("user already exists")

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new UserModel({
            username: username,
            password: hashedPassword
        })
        await newUser.save()
        res.status(200).json("user created successfully")
    } catch (error) {
        res.status(401).json("user creation failed")
    }
})
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await UserModel.findOne({ username: username })
        if (!user) res.status(401).json("user not found")

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) res.status(401).json("invalid username & password")

        const token = jwt.sign({ id: user._id }, "secretKey")


        res.status(200).json({ token, userId: user._id, username: user.username })
    } catch (error) {
        res.status(401).json("user creation failed")
    }
})






export default router

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, "secretKey", (err) => {
            if (err) return res.status(401).json("invalid token")
            next()
        })
    } else {
        res.status(403).json("invalid token")
    }
}

