
import jwt from "jsonwebtoken";
import userModel from "../../../DB/models/User.model.js";



export const updateUser= async (req,res)=>{


    try {
        
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const updateedUser = await userModel.findByIdAndUpdate(decoded.id,{userName:req.body.userName},{new:true})
            res.status(200).json({ message: "Welcome" ,updateedUser});
    } catch (error) {
        
    }





}