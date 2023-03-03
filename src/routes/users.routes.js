import { Router } from "express";
// import { authValidation } from "../middlewares/authorization.middlewares.js";

const router = Router();

// router.get("/users/me", authValidation, () => { });
router.get("/ranking", () => { });

export default router;
