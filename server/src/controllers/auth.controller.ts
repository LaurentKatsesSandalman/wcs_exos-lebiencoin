import type { RequestHandler } from "express";
import { createUser, findUserByEmail } from "../models/user.model";
import { UserPayload } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister: RequestHandler = async (req, res, next) => {
  console.log("userregister reached");
  try {
    //gestion du body request
    const { email, password, user_name, user_town } = req.body;
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof user_name !== "string" ||
      typeof user_town !== "string"
    ) {
      res.status(400).json({
        error: "Champs invalides ou manquants dans le corps de la requête.",
      });
      return;
    }
    // unicité de l'email
    const emailUsed = await findUserByEmail(email);
    if (emailUsed) {
      res.status(409).json({ error: "Email déjà utilisé" }); // après recherche, j'avais mis res.status(200) mais il semble qu'il faille utiliser 409
      return;
    }
    //hash et remplacement du password
    const hashedPassword = await bcrypt.hash(password, 10);
    const fields: UserPayload = { email, password, user_name, user_town };
    fields.password = hashedPassword;
    // ajout potentiel du phone
    if (typeof req.body["phone"] === "string") {
      fields["phone"] = req.body["phone"];
    }

    // creation du user
    const newUser = await createUser({ ...fields });
    res.status(201).json({ message: "Utilisateur créé" }); //temp before token
  } catch (err) {
    next(err);
  }
};

export const userLogin: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email et mot de passe requis.' });
      return ;
    }

    const userToCheck = await findUserByEmail(email);
    if (!userToCheck) {
      res.status(401).json({ error: 'Identifiants invalides.' });
    } else {
      const loginSuccess = await bcrypt.compare(password, userToCheck.password);
      if (loginSuccess) {
        // création du token
        const token = jwt.sign(
          { id: userToCheck.user_id, email: userToCheck.email }, // payload
          process.env.APP_SECRET!, // clé secrète
          { expiresIn: "2h" }
        ); // durée avant expiration du token

            // Exclure le mot_de_passe dans la réponse // rajouté à la correction
        const { password, ...userWithoutPassword } = userToCheck;  // rajouté à la correction


        // Envoie le token
        res.status(200).json({ token, user: userWithoutPassword }); //"user: userwithouttoken" rajouté à la correction
      } else {
        res.status(401).json({ error: "Mot de passe incorrect" });
        return ;
      }
    }
  } catch (err) {
    next(err);
  }
};
