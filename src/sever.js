import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewengine";
import initWebRoute from "./route/web";
require("dotenv").config();
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);
initWebRoute(app);
let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Backend is running on port::", port);
});
