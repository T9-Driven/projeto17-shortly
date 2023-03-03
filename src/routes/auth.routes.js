import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import loginSchema from "../schemas/loginSchema.js";
import userSchema from "../schemas/userSchema.js";

const router = Router();

router.post("/signin", validateSchema(loginSchema), () => { });
router.post("/signup", validateSchema(userSchema), () => { });

export default router;
