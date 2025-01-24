import { model, Schema,Types } from "mongoose";



const messageSchema = Schema(
  {
    message: {
      type: String,
      required: [true, "this field is required"],

    },
    receiverId: {
      type: Types.ObjectId(),
      required: true,
      ref:"User"
    }
  },{ timestamps: true });

const messageModel = model("message", messageSchema);

export default messageModel;
