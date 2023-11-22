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
        address: data.adress,
        phoneNumber: data.phonenumber,
        gender: data.gender === 1 ? true : false,
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
module.exports = { createUser, hashUserPassWord, getAllUser };
