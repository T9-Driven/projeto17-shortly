import { Router } from "express";
import { authValidation } from "../middlewares/authorization.middleware.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { deleteUrl, getUrlById, openShortUrl, shortenUrl } from "../controllers/url.controller.js";

const router = Router();

router.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  authValidation,
  shortenUrl
);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", openShortUrl);
router.delete("/urls/:id", authValidation, deleteUrl);

export default router;
