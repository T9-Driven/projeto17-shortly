import { Router } from "express";
import { authValidation } from "../middlewares/authorization.middleware.js";
import { getLoggedUser, getRanking } from "../controllers/users.controller.js";

const router = Router();

router.get("/users/me", authValidation, getLoggedUser);
router.get("/ranking", getRanking);

export default router;
