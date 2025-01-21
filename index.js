import * as dotenv from "dotenv";

dotenv.config({});

import express from "express";
import bootstrap from "./src/app.controller.js";
/* import fs from "node:fs"; */
const app = express();
const port = process.env.PORT  || 8000;

bootstrap(app, express);

app.listen(port, () => console.log(`saraha app listening on port ${port}!`));
