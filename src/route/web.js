import express from "express";
import {
  getHomePage,
  getMinhThu,
  getCrud,
  postCRUD,
  getData,
} from "../controler/homeControler";
let router = express.Router();
let initWebRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/minhthu", getMinhThu);
  router.get("/CRUD", getCrud);
  router.get("/get-crud", getData);
  router.post("/post-crud", postCRUD);
  return app.use("/", router);
};
module.exports = initWebRoute;
