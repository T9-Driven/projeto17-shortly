import { Router } from "express";
import { authValidation } from "../middlewares/authorization.middleware.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { shortenUrl } from "../controllers/url.controller.js";

const router = Router();

router.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  authValidation,
  shortenUrl
);
router.get("/urls/:id", () => { });
// router.delete("/urls/:id", authValidation, () => { });
router.get("/urls/open/:shortUrl", () => { });

export default router;
