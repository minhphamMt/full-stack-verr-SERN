import db from "../models";
let getAllDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },

        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        nest: true,
        raw: true,
      });
      if (users) {
        resolve({
          errCode: 0,
          data: users,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let getAllDoctorEdit = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (err) {
      reject(err);
    }
  });
};
let createInfoDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.contentMarkdown || !data.contentHTML) {
        console.log("check data err:", data);
        resolve({
          errCode: 1,
          message: "missing data parameter",
        });
      } else {
        console.log(">>>check data input:", data);
        await db.MarkDown.create({
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          doctorId: data.doctorId,
          // specialtyId: data.specialtyId,
          // clinicID: data.clinicID,
        });

        resolve({
          errCode: 0,
          message: "create info doctor success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = { getAllDoctorHome, getAllDoctorEdit, createInfoDoctor };
