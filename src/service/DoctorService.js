import db from "../models";
require("dotenv").config();
import _ from "lodash";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
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
let bulkCreateScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.date) {
        resolve({
          errCode: 1,
          message: "Missing data ",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.date },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });
        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.date = new Date(item.date).getTime();
            return item;
          });
        }
        let tocreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });
        console.log(">>.check to create", tocreate);
        console.log(">>>check esis:", existing);
        if (tocreate && tocreate.length > 0) {
          await db.Schedule.bulkCreate(tocreate);
        }
        resolve({
          errCode: 0,
          message: "ok it done",
        });
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
  bulkCreateScheduleService,
};
