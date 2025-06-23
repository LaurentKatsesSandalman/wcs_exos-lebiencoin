import express from "express";

import {
    getAllAdverts,
    getThisAdvert,
    createAdvert,
    updateThisAdvert,
    deleteAdvert,
} from "./../controllers/advert.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = express.Router();


router.get("/", getAllAdverts);
router.get("/:id", getThisAdvert);
router.post("/", authenticateToken, createAdvert);
router.patch("/:id", authenticateToken, updateThisAdvert);
router.delete("/:id", authenticateToken, deleteAdvert);


export default router;
