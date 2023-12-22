import express from "express";
import {
  handleLogin,
  handleGetAllUser,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
} from "../controler/usercontoler";
import getDoctoHome from "../controler/doctorControler";
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
  router.get("/minhpham", getMinhThu);
  router.get("/CRUD", getCrud);
  router.get("/get-crud", getData);
  router.get("/edit-crud", EditCrud);
  router.get("/delete-crud", DeleteCrud);
  router.post("/post-crud", postCRUD);
  router.post("/put-crud", putCRUD);
  router.post("/api/login", handleLogin);
  router.post("/api/get-all-users", handleGetAllUser);
  router.post("/api/create-a-user", handleCreateUser);
  router.put("/api/edit-a-user", handleEditUser);
  router.delete("/api/delete-a-user", handleDeleteUser);
  router.get("/api/getAllCode", getAllCode);
  router.get("/api/doctor-home", getDoctoHome);
  return app.use("/", router);
};
module.exports = initWebRoute;
