import type { RequestHandler } from "express";
import { findUserByEmail, findUserById } from "../models/user.model";
import type { UserPayload, User } from "../types/user";

export const getThisUserId: RequestHandler = async (req, res, next) => {
        try {
            const user_id = Number.parseInt(req.params.id)
            if (isNaN(user_id)) {
                res.status(400).json({ error: 'L\'id de l\'utilisateur est censée être numérique' });
                return;
            }
            // Fetch a specific advert based on the provided ID: advert
            const user = await findUserById(user_id);
            //respond with the advert in JSON format
            res.json(user);
        } catch (err) {
            // Pass any errors to the error-handling middleware
            next(err);
        }
}


export const getThisUserEmail: RequestHandler = async (req, res, next) => {
        try {
            const user_email = req.params.email
            if (!user_email) {
                res.status(400).json({ error: 'L\'email de l\'utilisateur est corrompu ou manquant' });
                return;
            }
            // Fetch a specific advert based on the provided ID: advert
            const user = await findUserByEmail(user_email);
            //respond with the advert in JSON format
            res.json(user);
        } catch (err) {
            // Pass any errors to the error-handling middleware
            next(err);
        }
}