import { Router } from "express";
import * as authService from "./service/auth.service.js";

const authRoutes = Router();

authRoutes.post("/signUp", authService.register);


authRoutes.post("/login", authService.login);

export default authRoutes;
