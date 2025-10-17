const { getReceiverSocketId, io } = require("../libs/socket")
const Message = require("../models/Message")
const User = require("../models/User")

const getChattedUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const messages = await Message.find({
            $or: [{ senderId: loggedInUser }, { receiverId: loggedInUser }],
        }).sort({ createdAt: -1 });

        const userMap = new Map();
        messages.forEach((msg) => {
            if (!userMap.has(msg.senderId.toString())) {
                userMap.set(msg.senderId.toString(), msg.createdAt);
            }
            if (!userMap.has(msg.receiverId.toString())) {
                userMap.set(msg.receiverId.toString(), msg.createdAt);
            }
        });

        const users = await User.find({ _id: { $in: Array.from(userMap.keys()) } }).select("-password");

        const sortedUsers = Array.from(userMap.keys())
            .map((id) => users.find((u) => u._id.toString() === id))
            .filter(Boolean);

        res.status(200).json({ users: sortedUsers });
    } catch (err) {
        console.log("Error in getChattedUsers controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


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
        const senderSocketId = getReceiverSocketId(senderId);

        if (receiverSocketId && receiverSocketId !== senderSocketId){
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

module.exports = { getChattedUsers, sendMessages, getMessages}