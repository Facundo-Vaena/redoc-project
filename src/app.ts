import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import router from "./routes";
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json")
const express = require("express");
const app = express();


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Ok");
});

app.use("/api", [router]);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3003, () => console.log("listening at por 3003!"));

// require("./routes/index")(app);