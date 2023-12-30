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
let getDetailDoctor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "missing required parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },

          include: [
            {
              model: db.MarkDown,
              attributes: ["description", "contentMarkdown", "contentHTML"],
              // as: "positionData",
              // attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let EditDetailService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(">>>check data backend:", data);
      if (!data) {
        resolve({
          errCode: 1,
          message: "missing data input",
        });
      } else {
        let doctor = await db.MarkDown.findOne({
          where: { doctorId: data.doctorId },
          raw: false,
        });
        console.log(">>>check doctor:", doctor);
        if (doctor) {
          await doctor.set({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
          });
          await doctor.save();
          resolve({
            errCode: 0,
            message: "update info is done",
          });
        } else {
          resolve({
            errCode: 2,
            message: "something wrong!",
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  getAllDoctorHome,
  getAllDoctorEdit,
  createInfoDoctor,
  getDetailDoctor,
  EditDetailService,
};
