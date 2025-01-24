import { Router } from "express";
import * as userService from "./service/user.service.js";




const userRoutes = Router();
  
userRoutes.put("/", userService.updateUser);




export default userRoutes;
