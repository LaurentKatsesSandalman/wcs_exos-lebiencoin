import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  findAllAdverts,
  findAdvertById,
  insertAdvert,
  updateAdvert,
  deleteAdvertById,
} from "../models/advert.model";
import type { Advert } from "../types/advert";
import { RequestWithUser } from "../types/user";

// The B of BREAD - Browse (Read All) operation

export const getAllAdverts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch all items
    const adverts: Advert[] = await findAllAdverts();
    // Respond with the items in JSON format
    res.status(200).json(adverts);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
export const getThisAdvert: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const advert_id = Number.parseInt(req.params.id);
    if (isNaN(advert_id)) {
      res
        .status(400)
        .json({ error: "L'id de l'annonce est censée être numérique" });
      return;
    }
    // Fetch a specific advert based on the provided ID: advert
    const advert = await findAdvertById(advert_id);

    if (!advert) {
      res.status(404).json({ error: "Annonce non trouvée" });
      return;
    }
    //respond with the advert in JSON format
    res.status(200).json(advert);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
export const createAdvert: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, price, user_id, category_id } = req.body;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof price !== "number" ||
      typeof user_id !== "number" ||
      typeof category_id !== "number"
    ) {
      res
        .status(400)
        .json({ error: "Champs invalides dans le corps de la requête." });
      return;
    }

    // Create the advert
    const newAdvert = await insertAdvert({
      title,
      description,
      price,
      user_id,
      category_id,
    });
    res.status(201).json(newAdvert);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

//The U of BREAUD (lol) - Update operation
export const updateThisAdvert: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const advert_id = Number.parseInt(req.params.id);
    if (isNaN(advert_id)) {
      res
        .status(400)
        .json({ error: "L'id de l'annonce est censée être numérique" });
      return;
    }
    const fields: Partial<Advert> = {};
    if (typeof req.body["title"] === "string") {
      fields["title"] = req.body["title"];
    }
    if (typeof req.body["description"] === "string") {
      fields["description"] = req.body["description"];
    }
    if (typeof req.body["price"] === "number") {
      fields["price"] = req.body["price"];
    }
    if (typeof req.body["category_id"] === "number") {
      fields["category_id"] = req.body["category_id"];
    }

    const updatedAdvert = await updateAdvert({ advert_id, ...fields });

      if (!updatedAdvert) {
     res.status(404).json({ error: 'Annonce non trouvée' });
      return ;
    }

    res.status(200).json(updatedAdvert);
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Delete operation
export const deleteAdvert: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const advertId = Number.parseInt(req.params.id);
    if (isNaN(advertId)) {
      res
        .status(400)
        .json({ error: "L'id de l'annonce est censée être numérique" });
      return;
    }
    const deleted = await deleteAdvertById(advertId);
    // deleted est un boolean qui nous permet de savoir si des lignes ont été affectées par la requête faite dans le modèle : true si une ligne a été supprimée, false si aucune ligne n'a été supprimée
    
   if (!deleted) {
       res.status(404).json({ error: 'Annonce non trouvée' });
       return;
    }
    res.sendStatus(204); // on ne revoie pas de contenu
  } catch (error) {
    next(error);
  }
};
