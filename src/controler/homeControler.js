import db from "../models/index";
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
module.exports = {
  getHomePage,
  getMinhThu,
};
