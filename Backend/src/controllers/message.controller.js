const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

  
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }


    const populatedConversation = await conversation.populate([
      { path: "participants", select: "name email" },
      {
        path: "messages",
        populate: { path: "sender receiver", select: "name email" },
      },
    ]);

    res.status(200).json({ success: true, conversation: populatedConversation });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all conversations and messages for the logged-in user
const getMessage = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all conversations where user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "name email")
      .populate({
        path: "messages",
        populate: { path: "sender receiver", select: "name email" },
      })
      .sort({ updatedAt: -1 }); 

    res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error("getMessages error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sendMessage, getMessage };
