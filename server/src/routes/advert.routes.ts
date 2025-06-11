import express from "express";

import {
    getAllAdverts,
    getThisAdvert,
    createAdvert,
    updateThisAdvert,
    deleteAdvert,
} from "./../controllers/advert.controller";

const router = express.Router();


router.get("/", getAllAdverts);
router.get("/:id", getThisAdvert);
router.post("/", authMiddleware, createAdvert);
router.patch("/:id", authMiddleware, updateThisAdvert);
router.delete("/:id", authMiddleware, deleteAdvert);


export default router;
