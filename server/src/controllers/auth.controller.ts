import type { RequestHandler } from "express";
import { createUser, findUserByEmail } from "../models/user.model";
import { UserPayload } from "../types/user";
import { error } from "console";
import bcrypt from "bcrypt";

export const userRegister: RequestHandler = async (req, res, next) => {
    try {
        //gestion du body request
        const { email, password, user_name, user_town } = req.body
        if (
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof user_name !== 'string' ||
            typeof user_town !== 'string'
        ) {
            res.status(400).json({ error: "Champs invalides ou manquants dans le corps de la requête." });
            return;
        }
        // unicité de l'email
        const emailUsed = !(await findUserByEmail(email))
        if (emailUsed) {
            res.status(200).json({ error: "Email déjà utilisé" })
        }
        //hash et remplacement du password
        const hashedPassword = await bcrypt.hash(password, 10);
        const fields: UserPayload = { email, password, user_name, user_town }
        fields.password = hashedPassword
        // ajout potentiel du phone
        if (typeof (req.body["phone"]) === "string") { fields["phone"] = req.body["phone"] }

        // creation du user
        const newUser = await createUser({ ...fields })
        res.status(201).json({ message: "Utilisateur créé" })//temp before token
    } catch (err) {
        next(err);
    }
}

export const userLogin: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userToCheck = await findUserByEmail(email)
        if (!userToCheck) {
            res.status(400).json({ error: "Utilisateur introuvable" })
        }
        else{
        const loginSuccess = await bcrypt.compare(password, userToCheck.password)}
    } catch (err) {
        next(err);
    }
}