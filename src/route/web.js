import express from "express";
import { handleLogin } from "../controler/usercontoler";
import {
  getHomePage,
  getMinhThu,
  getCrud,
  postCRUD,
  getData,
  EditCrud,
  putCRUD,
  DeleteCrud,
} from "../controler/homeControler";
let router = express.Router();
let initWebRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/minhthu", getMinhThu);
  router.get("/CRUD", getCrud);
  router.get("/get-crud", getData);
  router.get("/edit-crud", EditCrud);
  router.get("/delete-crud", DeleteCrud);
  router.post("/post-crud", postCRUD);
  router.post("/put-crud", putCRUD);
  router.post("/api/login", handleLogin);
  return app.use("/", router);
};
module.exports = initWebRoute;
