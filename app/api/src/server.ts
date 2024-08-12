/**
 * This file will server as a backend folder to allow users to log with their media wiki account and see their progress of learning SPARQL
 * We will try to log with wikimedia account -> wikipedia, wikidata
 */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';


const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('*', function (_: Request, res: Response) {
  res.send("Welcome to wikidata query ! 😊😊😊");
});

export default app;