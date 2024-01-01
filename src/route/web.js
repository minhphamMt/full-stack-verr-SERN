import express from "express";
import {
  handleLogin,
  handleGetAllUser,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
} from "../controler/usercontoler";
import {
  getDoctoHome,
  getAllDoctor,
  createInfo,
  getDetailDoctorId,
  handleEditDetail,
  bulkCreateSchedule,
} from "../controler/DoctorControler";
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
  router.get("/api/get-all-doctor", getAllDoctor);
  router.post("/api/post-info-doctor", createInfo);
  router.get("/api/get-detail-doctor-by-id", getDetailDoctorId);
  router.put("/api/edit-detail-doctor", handleEditDetail);
  //tạo lịch khám
  router.post("/api/bulk-create-schedule", bulkCreateSchedule);
  return app.use("/", router);
};
module.exports = initWebRoute;
