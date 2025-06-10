import { Request, Response, NextFunction } from 'express';
import { getWelcomeMessage } from '../models/test.model';

export const getHello = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await getWelcomeMessage();
    res.json({ message });
  } catch (error) {
    next(error); // on passe l'erreur à Express pour qu'il l'intercepte dans un middleware d'erreur global
  }
};