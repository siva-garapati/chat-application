const { getReceiverSocketId, io } = require("../libs/socket")
const Message = require("../models/Message")
const User = require("../models/User")

const getUsers = async(req, res)=>{
    try{
        const loggedInuser = req.user._id

        const users = await User.find({_id : {$ne:loggedInuser}}, {password:0})

        // console.log(users)

        res.status(200).json({'data':'ok', users})
    }
    catch(err){
        console.log("Error in getUsers controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const sendMessages = async(req,res)=>{
    try{
        // console.log(req.body)
        const {text, receiverId} = req.body

        // console.log(receiverId, text)

        const senderId = req.user._id

        const newMessage = new Message({
            senderId,
            receiverId,
            text
        })

        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }

        res.status(201).json(newMessage)
    }
    catch (err) {
        console.log("Error in sendMessages controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getMessages = async(req,res)=>{
    try{
        const {id:otherId} = req.params
        const myId = req.user._id

        // console.log(otherId, myId)

        const messages = await Message.find({
            $or:[
                { senderId: myId, receiverId: otherId },
                { senderId: otherId, receiverId: myId }
            ]
        })

        res.status(200).json(messages);
    }
    catch (err) {
        console.log("Error in getMessages controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {getUsers, sendMessages, getMessages}