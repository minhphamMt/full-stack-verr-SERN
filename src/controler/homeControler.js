let getHomePage = (req, res) => {
  res.send("hello world with home page");
};
let getMinhThu = (req, res) => {
  res.send("hello world with MINH Thu");
};
module.exports = {
  getHomePage,
  getMinhThu,
};
