import { Router } from "express";
// import { authValidation } from "../middlewares/authorization.middlewares.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateSchema } from "../middlewares/schemaValidator.js";

const router = Router();

router.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  authValidation,
  () => { }
);
router.get("/urls/:id", () => { });
router.delete("/urls/:id", authValidation, () => { });
router.get("/urls/open/:shortUrl", () => { });

export default router;
