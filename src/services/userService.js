const db = require("../models");
import bcrypt, { hash } from "bcryptjs";
// import { promiseImpl } from "ejs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      //check email exist
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //find user
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
          attributes: ["email", "password", "firstName", "lastName", "roleId"],
        });
        //check user
        if (user) {
          // check enter your pass and pass in db
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            //check pass success
            userData.errCode = 0;
            userData.errMessage = "success!";
            delete user.password;
            userData.user = user;
          } else {
            //check pass Wrong
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          //check email not found
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's email isn't exist in system. please try other email.`;
      }
      resolve(userData);
    } catch (err) {
      reject(err);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      //find email
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      // return
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

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId == "ALL") {
        users = db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email exist

      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "your email already exists. pleaser enter another email!",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "success!",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id },
    });
    if (!user) {
      resolve({
        errCode: 2,
        message: "The user is not exist!",
      });
    }
    await db.User.destroy({
      where: { id },
    });
    resolve({
      errCode: 0,
      message: "Delete success!",
    });
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.gender || !data.positionId) {
        resolve({
          errCode: 2,
          message: "Missing required parameters!",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.roleId = data.roleId;
        user.gender = data.gender;
        user.positionId = data.positionId;
        if (data.avatar) {
          user.image = data.avatar;
        }
        await user.save();
        resolve({
          errCode: 0,
          message: "Update succes!",
        });
      } else {
        resolve({
          errCode: 1,
          message: `User's not found!`,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getAllcodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = "";
      if (!typeInput) {
        resolve({
          errCode: 1,
          message: "Missing required parameters!",
        });
      } else {
        let res = await db.Allcode.findAll({
          where: { type: typeInput },
        });

        resolve(res);
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllcodeService: getAllcodeService,
};
