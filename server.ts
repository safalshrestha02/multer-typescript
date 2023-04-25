import bodyParser from "body-parser";
import express from "express";

import routes from "./routes/routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(3333, () => console.log("server running on port 3333"));
