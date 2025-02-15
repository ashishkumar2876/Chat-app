import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId,io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id; // ID of the sender, assuming it's available in req
    const receiverId = req.params.id; // Receiver ID from the URL parameter
    const { message } = req.body; // Message content from the request body

    // Find existing conversation between sender and receiver
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If conversation doesn't exist, create a new one
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message with the correct field names (sender, receiver)
    const newMessage = await Message.create({
      sender: senderId,    // Ensure 'sender' is used
      receiver: receiverId, // Ensure 'receiver' is used
      message,              // Message text
    });

    // If the new message is created, push it into the conversation's messages array
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    // Save the updated conversation
    await Promise.all([gotConversation.save(),newMessage.save()]);

    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
    io.to(receiverSocketId).emit('newMessage',newMessage);
    }
    return res.status(201).json({
      newMessage
    });
    

    // Respond with success message
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessage=async (req,res)=>{
    try {
        const receiverId=req.params.id;
        const senderId=req.id;
        const conversation=await Conversation.findOne({
            participants: {$all: [senderId,receiverId]}
        }).populate("messages");
        
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
}