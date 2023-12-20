import {
  handleUserLogin,
  getAllUSers,
  createNew,
  DeleteUser,
  EditUser,
  getAllCodeService,
} from "../service/userservice";
import db from "../models";
const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errcode: 1,
      messenger: "missing data input",
    });
  } else {
    let userData = await handleUserLogin(email, password);
    return res.status(200).json({
      errcode: userData.errcode,
      messenger: userData.errorMessage,
      //   email,
      //   password,
      user: userData.user ? userData.user : {},
    });
  }
};
const handleGetAllUser = async (req, res) => {
  let id = req.body.id;
  let users = await getAllUSers(id);
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing req parameters",
      users: [],
    });
  }
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};
const handleCreateUser = async (req, res) => {
  let data = req.body;
  let message = await createNew(data);
  return res.status(200).json({
    message,
  });
};
const handleEditUser = async (req, res) => {
  let data = await req.body;
  if (!data) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing Data",
    });
  }
  let message = await EditUser(data);
  res.status(200).json({
    message,
  });
};
const handleDeleteUser = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing Data",
    });
  }
  let message = await DeleteUser(id);
  return res.status(200).json({
    message,
  });
};
let getAllCode = async (req, res) => {
  try {
    let type = req.query.type;
    let data = await getAllCodeService(type);
    return res.status(200).json(data);
  } catch (err) {
    console.log("get all code err:", err);
    res.status(200).json({
      errCode: -1,
      errMessage: "err from Sever",
    });
  }
};
module.exports = {
  handleLogin,
  handleGetAllUser,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
};
