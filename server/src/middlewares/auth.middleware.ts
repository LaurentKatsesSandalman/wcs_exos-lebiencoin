import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser, User } from "../types/user";
import type { RequestHandler } from "express";

// Cette partie est hyper importante pour avoir accès à req.user !!
interface AuthenticatedRequest extends Request {
  user?: {
    user_id: number;
    email: string;
  };
}



export const authenticateToken  = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // récupération de authorization, qui fait partie de l'objet headers :
  const authHeader = req.headers.authorization; 

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token manquant ou invalide" });
    return; // 401 : unauthorized : pas de token
  }

// TODO : récupérer la partie avec que le token dans authHeader 
// --> faites un console.log au besoin, pour voir la tête qu'il a, et ne récupérez que la partie après `Bearer`

// Ma version:
//  const token = authHeader.slice(7)
  
//La correction (plus propre):
const token = 
//authHeader && authHeader.startsWith('Bearer ') ? // La correction fait tout ici, y compris la verif "if (!authHeader?.startsWith("Bearer "))"
 authHeader.split(' ')[1] 
  //  : null;

    if (!token) {
    res.status(401).json({ error: 'Token manquant' });
    return ;
  }

try {
// verify() prend deux paramètres : 
// le premier, le token que vous venez de vérifier, 
// le second paramètre est le clé secrète, qui est dans votre .env

    const payload = jwt.verify(token, process.env.APP_SECRET! ) as User;

  if (!payload || typeof payload === 'string' || !payload.user_id || !payload.email) {
      res.status(401).json({ error: 'Token invalide' });
      return ;
    }

    req.user = payload; // Attache le user à la requête
    next();
  } catch (err) {
    res.status(403).json({ message: "Token invalide ou expiré" });
    return; // 403 : forbidden, un token mais pas le bon 
  }
};