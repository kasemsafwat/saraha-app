import mongoose from "mongoose";

const connection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/ITISaraha")
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.log("DB connection Error");
    });
};

export default connection();
