import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);
let createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashpass = await hashUserPassWord(data.pswd);
      await db.User.create({
        email: data.email,
        password: hashpass,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        phoneNumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.role,
      });
      resolve("ok create user sucess!");
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
let getAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let Users = await db.User.findAll({ raw: true });
      resolve(Users);
    } catch (err) {
      reject(err);
    }
  });
};
let getUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: id }, raw: true });
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};
let updateUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.set({
          firstName: data.firstname,
          lastName: data.lastname,
          address: data.address,
        });
        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (err) {
      reject(err);
    }
  });
};
let DeleteUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: id } });
      await user.destroy();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  createUser,
  hashUserPassWord,
  getAllUser,
  getUserById,
  updateUser,
  DeleteUser,
};
