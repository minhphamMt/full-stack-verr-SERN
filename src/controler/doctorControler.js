import {
  getAllDoctorHome,
  getAllDoctorEdit,
  createInfoDoctor,
} from "../service/DoctorService";
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
let getAllDoctor = async (req, res) => {
  try {
    let doctors = await getAllDoctorEdit();
    return res.status(200).json(doctors);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      message: "Err from sever",
    });
  }
};
let createInfo = async (req, res) => {
  try {
    let response = await createInfoDoctor(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      message: "Err from sever",
    });
  }
};
module.exports = { getDoctoHome, getAllDoctor, createInfo };
