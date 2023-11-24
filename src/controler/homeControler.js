import db from "../models/index";
import {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  DeleteUser,
} from "../service/CRUDservice";
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
let EditCrud = async (req, res) => {
  let userid = req.query.id;
  if (userid) {
    let userData = await getUserById(userid);
    console.log(">>>check userData:", userData);
    console.log(">>>check gender:", userData.gender);
    res.render("Editcrud.ejs", { userData: userData });
  } else {
    res.send("something wrong!");
  }
};
let putCRUD = async (req, res) => {
  let data = await req.body;
  await updateUser(data);
  return res.redirect("/get-crud");
};
let DeleteCrud = async (req, res) => {
  let id = req.query.id;
  await DeleteUser(id);
  return res.redirect("/get-crud");
};
module.exports = {
  getHomePage,
  getMinhThu,
  getCrud,
  postCRUD,
  getData,
  EditCrud,
  putCRUD,
  DeleteCrud,
};
