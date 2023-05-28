import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

//use cors middleware
app.use(cors());

//use json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Api Route

app.get("/", (req: Request, res: Response) => {
  res.send("Working fine");
});

export default app;
