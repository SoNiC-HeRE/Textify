import Mongoose from "mongoose";

const conversationSchema = new Mongoose.Schema({
    members:[ 
        {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        }
    ],
    messages: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Message",
        }
    ]
}, {timestamps: true});

const Conversation = Mongoose.model("Conversation",conversationSchema);

export default Conversation;