import { Router } from 'express';
import { getHello } from '../controllers/test.controller';

const router = Router(); // si vous n'importez pas directement Router depuis Express comme fait ici en ligne 1, vous devez faire : 
//const router = express.Router()
// les deux solutions sont correctes

router.get('/', getHello); // revient à : GET /api/test

export default router;