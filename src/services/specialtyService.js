import db from "../models/index";

let createNewSpecialty = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !dataInput.name ||
        !dataInput.imageBase64 ||
        !dataInput.descriptionHTML ||
        !dataInput.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          message: "Missing requited parameter!",
        });
      } else {
        await db.Specialty.create({
          name: dataInput.name,
          image: dataInput.imageBase64,
          descriptionHTML: dataInput.descriptionHTML,
          descriptionMarkdown: dataInput.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          message: "Succeed!",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({
        raw: true,
      });
      resolve({
        errCode: 0,
        message: "Succeed!",
        data
      });
    } catch (err) {
      reject(err);
    }
  });
};

let deleteSpecialty = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findOne({
        where: { id: inputId },
      });
      if (!data) {
        resolve({
          errCode: 2,
          message: "The specialty is not exist!",
        });
      }
      await db.Specialty.destroy({
        where: { id: inputId },
      });
      resolve({
        errCode: 0,
        message: "Delete success!",
      });
    } catch (err) {
      reject(err);
    }
  });
};

let updateSpecialty = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findOne({
        where: { id: dataInput },
        raw: false,
      });
      if (data) {
        data.name = dataInput.name;
        data.descriptionHTML = dataInput.descriptionHTML;
        data.descriptionMarkdown = dataInput.descriptionMarkdown;
        data.image = dataInput.image;
        await data.save();
        let allSpecialty = await db.Specialty.findAll();
        resolve({
          errCode: 0,
          message: "Succeed!",
          allSpecialty,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getDetailSpecialtyById = (id, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!id || !location){
        resolve({
          errCode: 1,
          message: "Missing requited parameter!",
        })
      }else{
        
          let data = await db.Specialty.findOne({
            where: { id },
            attributes:['descriptionHTML','descriptionMarkdown']
          })
          if(!data){
          data={}
          }else{
            let doctorSpecialty=[]
            if(location==='ALL'){
              doctorSpecialty = await db.Doctor_Info.findAll({
                where:{specialtyId:id},
                attributes:['doctorId','provinceId']
              })
            }else{
              doctorSpecialty = await db.Doctor_Info.findAll({
                where:{
                  specialtyId:id,
                  provinceId:location
                },
                attributes:['doctorId','provinceId']
              })
            }
            
            data.doctorSpecialty=doctorSpecialty
          }
          
        
        resolve({
          errCode: 0,
          message: "Succeed!",
          data
        });
      
      }
      
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  createNewSpecialty,
  getAllSpecialty,
  deleteSpecialty,
  updateSpecialty,
  getDetailSpecialtyById,
};
