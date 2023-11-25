import db from "../models";
import bcrypt from "bcryptjs";
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
            delete user["roleId"];
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
module.exports = { handleUserLogin, checkUseremail };
