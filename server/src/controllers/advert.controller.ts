import type { RequestHandler } from "express";
import { findAllAdverts, findAdvertById, insertAdvert, updateAdvert, deleteAdvertById} from "../models/advert.model";
import type { Advert } from "../types/advert";

// The B of BREAD - Browse (Read All) operation

export const getAllAdverts: RequestHandler = async (req, res, next) => {
    try {
        // Fetch all items
        const adverts= await findAllAdverts();
        // Respond with the items in JSON format
        res.json(adverts);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }

};

// The R of BREAD - Read operation
export const getThisAdvert: RequestHandler = async (req, res, next) => {
    try {
        const advert_id = Number.parseInt(req.params.id)
        if (isNaN(advert_id)) {
            res.status(400).json({ error: 'L\'id de l\'annonce est censée être numérique' });
            return;
        }
        // Fetch a specific advert based on the provided ID: advert
        const advert = await findAdvertById(advert_id);
        //respond with the advert in JSON format
        res.json(advert);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
export const createAdvert: RequestHandler = async (req, res, next) => {
    try {
        const { title, description, price, user_id, category_id } = req.body

        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof price !== 'number' ||
            typeof user_id !== 'number' ||
            typeof category_id !== 'number'
        ) {
            res.status(400).json({ error: "Champs invalides dans le corps de la requête." });
            return;
        }
        
        // Create the advert
        const newAdvert = await insertAdvert({ title, description, price, user_id, category_id })
        res.status(201).json(newAdvert)
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

//The U of BREAUD (lol) - Update operation
export const updateThisAdvert: RequestHandler = async (req, res, next) => {
    try {
                const advert_id = Number.parseInt(req.params.id)
        if (isNaN(advert_id)) {
            res.status(400).json({ error: 'L\'id de l\'annonce est censée être numérique' });
            return;
        }
        const fields: Partial<Advert>  = {}
        if (typeof (req.body["title"])==="string"){fields["title"]=req.body["title"]}
        if (typeof (req.body["description"])==="string"){fields["description"]=req.body["description"]}
        if (typeof (req.body["price"])==="number"){fields["price"]=req.body["price"]}
        if (typeof (req.body["category_id"])==="number"){fields["category_id"]=req.body["category_id"]}

        const updatedAdvert = await updateAdvert({ advert_id, ...fields })
        res.status(200).json(updatedAdvert)
    } catch (err) {
        next(err);
    }
};

// The D of BREAD - Delete operation
export const deleteAdvert: RequestHandler = async (req, res, next) => {
    try {        
        const advertId = Number.parseInt(req.params.id)
        if (isNaN(advertId)) {
            res.status(400).json({ error: 'L\'id de l\'annonce est censée être numérique' });
            return;
        }
    const result = await deleteAdvertById(advertId)
    res.status(200).json(result)
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};


