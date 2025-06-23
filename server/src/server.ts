import cors from "cors";
import express, { Application,  Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'; 
import advertRouter from './routes/advert.routes';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';

dotenv.config();

const app: Application = express();

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Use cors to allow our client url (in env variables) to query our back
if (process.env.CLIENT_URL != null) {
    app.use(cors({ origin: process.env.CLIENT_URL }));
}

app.use(morgan('dev')); // Morgan est un middleware Express qui permet de logger en temps réel chacune des requêtes HTTP reçues par le serveur Express
//Va permettre d'afficher des informations intéressantes comme : 
// la méthode HTTP, l'URL contactée, le statut HTTP de la réponse, le temps de réponse, la taille de la réponse (en bytes)

/* ************************************************************************* */
// Request Parsing (explications dans mono repo)
app.use(express.json());
/* ************************************************************************* */



// TODO
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/advert', advertRouter);

// middleware d'erreur par lequel on passera quand on lèvera une erreur générique :
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({message: "Erreur serveur, sorry"});
})


// TODO
// Mount the logErrors middleware globally
//app.use(logErrors);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
}).on("error", (err: Error) => {
    console.error("Error:", err.message);
});
