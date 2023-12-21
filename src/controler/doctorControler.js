import getAllDoctorHome from "../service/DoctorService";
let getDoctoHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let response = await getAllDoctorHome(+limit);
    res.status(200).json({
      response,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: "-1",
      message: "Err form sever",
    });
  }
};
module.exports = getDoctoHome;
