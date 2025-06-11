import cors from "cors";
import express, { Application,  Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import advertRouter from './routes/advert.routes';

dotenv.config();

const app = express();

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Use cors to allow our client url (in env variables) to query our back
if (process.env.CLIENT_URL != null) {
    app.use(cors({ origin: process.env.CLIENT_URL }));
}

/* ************************************************************************* */
// Request Parsing (explications dans mono repo)
app.use(express.json());
/* ************************************************************************* */



// TODO
//app.use("/api/users", userRouter);
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
