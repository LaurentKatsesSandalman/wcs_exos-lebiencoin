import express from "express";

import {getThisUserId, getThisUserEmail}

from "./../controllers/user.controller";

const router = express.Router();

router.get("/:id", getThisUserId);
router.get("/:email", getThisUserEmail);

export default router;