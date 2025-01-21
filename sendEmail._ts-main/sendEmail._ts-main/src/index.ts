import express, { Request, Response, NextFunction, Application } from "express";
import routes from "./app.controller";
import { database } from "./DB/connect";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./utils/errorHandling";
import redis from "./utils/redis";

const app: Application = express();
const port = 5000;
dotenv.config();
app.use(express.json());
app.use(cookieParser());
redis
//all routes
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

//handle not found route
app.all("*", (req: Request, res: Response): void => {
  res.json({ message: "Invaild URL or Method" });
});

app.use(errorHandler);

// after DB connection run ur server
database
  .connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch(() => {
    console.log("something went worng");
  });
