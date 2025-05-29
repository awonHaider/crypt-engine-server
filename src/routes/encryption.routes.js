import { Router } from "express";
import { caesarController, monoalphabeticController, oneTimePadController, playfairController, transpositionController } from "../controllers/encryption.controller.js";

const router = Router();

router.route("/caesar").post(caesarController)
router.route("/monoalphabetic").post(monoalphabeticController)
router.route("/playfair").post(playfairController)
router.route("/one-time-pad").post(oneTimePadController)
router.route("/transpositional-cipher").post(transpositionController)


export default router