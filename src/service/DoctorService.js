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
module.exports = getAllDoctorHome;
