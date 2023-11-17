import express from "express";
import { getHomePage, getMinhThu } from "../controler/homeControler";
let router = express.Router();
let initWebRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/minhthu", getMinhThu);
  return app.use("/", router);
};
module.exports = initWebRoute;
