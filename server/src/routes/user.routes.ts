import express from "express";

import {getThisUserId, getThisUserEmail}

from "./../controllers/user.controller";

import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get("/:id", authenticateToken, getThisUserId);
router.get("/:email", getThisUserEmail);

export default router;