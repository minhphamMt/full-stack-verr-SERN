import db from "../models";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userdata = {};
      let isExist = await checkUseremail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
        });
        if (user) {
          let checkpass = bcrypt.compareSync(password, user.password);
          if (checkpass) {
            userdata.errcode = 0;
            userdata.errorMessage = "ok pass is done";
            delete user["password"];
            delete user["image"];
            userdata.user = user;
          } else {
            userdata.errcode = 3;
            userdata.errorMessage = "wrong pass";
          }
        } else {
          userdata.errcode = 2;
          userdata.errorMessage = `user not found`;
          resolve(userdata);
        }

        resolve(userdata);
      } else {
        userdata.errcode = 1;
        userdata.errorMessage = `your email is isn't exist,pls try again`;
        resolve(userdata);
      }
    } catch (err) {
      reject(err);
    }
  });
};
let checkUseremail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: email } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      reject(err);
    }
  });
};
let getAllUSers = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "all") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "all") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};
let hashUserPassWord = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashpassword = await bcrypt.hashSync(password, salt);
      resolve(hashpassword);
    } catch (err) {
      reject(err);
    }
  });
};
let createNew = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUseremail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "your email is exist,plz use another email",
        });
      } else {
        let hashpass = await hashUserPassWord(data.password);
        let gender = "";
        if (data.gender === "M") {
          gender = "M";
        } else if (data.gender === "F") {
          gender = "F";
        } else {
          gender = "O";
        }
        await db.User.create({
          email: data.email,
          password: hashpass,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.img,
        });
        resolve({ errCode: 0, message: "ok" });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let DeleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: id } });
      if (!user) {
        resolve({
          errcode: 2,
          message: "the user isn't exist",
        });
      } else {
        await db.User.destroy({ where: { id: id } });
        resolve({
          errCode: 0,
          message: "Delete is done",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let EditUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(">>>check data:", data);
      if (!data.id) {
        resolve({
          errCode: 3,
          message: "Missing ID",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      let gender = "";
      if (data.gender === "M") {
        gender = "M";
      } else if (data.gender === "F") {
        gender = "F";
      } else {
        gender = "O";
      }
      if (user && data.firstName && data.lastName && data.address) {
        await user.set({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.image,
        });
        await user.save();
        resolve({
          errCode: 0,
          message: "update info is done",
        });
      } else {
        resolve({
          errCode: 2,
          message: "the user isn't exist or Mising data plz Check the input",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let getAllCodeService = (typeinput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeinput) {
        resolve({
          errCode: 1,
          errMessage: "missing data input",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeinput },
        });
        console.log(">>>Check allcode:", allcode);
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  handleUserLogin,
  checkUseremail,
  getAllUSers,
  createNew,
  DeleteUser,
  EditUser,
  getAllCodeService,
};
