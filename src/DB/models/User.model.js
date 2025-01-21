import { model, Schema } from "mongoose";

const roleType = {
  User: "User",
  Admin: "Admin",
  HR: "Hr",
};
const userSchema = Schema(
  {
    userName: {
      type: String,
      required: [true, "this field is required"],
      minlength: 2,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    gender: {
      type: String,
      enum: ["male", "femail"],
      default: "male",
    },
    DOB: Date,
    image: String,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(roleType),
      default: roleType.User,
    },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

export default userModel;
