import db from "../models/index";
import { createUser, getAllUser } from "../service/CRUDservice";
let getHomePage = async (req, res) => {
  try {
    let Data = await db.User.findAll();
    console.log(">>>check Data:", Data);
    return res.render("homePage.ejs", { Data: Data });
  } catch (err) {
    console.log(">>>check err:", err);
  }
};
let getMinhThu = (req, res) => {
  return res.send("hello world with MINH Thu");
};
let getCrud = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let messenger = await createUser(req.body);
  console.log("messenger = ", messenger);
  return res.redirect("/CRUD");
};
let getData = async (req, res) => {
  let Data = await getAllUser();

  return res.render("displayUser.ejs", { Data: Data });
};
module.exports = {
  getHomePage,
  getMinhThu,
  getCrud,
  postCRUD,
  getData,
};
