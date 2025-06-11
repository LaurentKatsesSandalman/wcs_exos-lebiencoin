import express from "express";

import {
    getAllAdverts,
    getThisAdvert,
    createAdvert,
    updateThisAdvert,
    deleteAdvert,
} from "./../controllers/advert.controller";

const router = express.Router();


router.get("/:form_id/", getAllAdverts);
router.get("/:form_id/:id", getThisAdvert);
router.post("/:form_id/", createAdvert);
router.put("/:form_id/:id", updateThisAdvert);
router.delete("/:form_id/:id", deleteAdvert);


export default router;
