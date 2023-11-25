import { handleUserLogin } from "../service/userservice";
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
      messenger: userData.errmessage,
      //   email,
      //   password,
      user: userData.user ? userData.user : {},
    });
  }
};
module.exports = { handleLogin };
