import specialtyService from "../services/specialtyService";

let createNewSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.createNewSpecialty(req.body);
    return res.status(200).json(info);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.getAllSpecialty();
    return res.status(200).json(info);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let deleteSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.deleteSpecialty(req.query.id);
    return res.status(200).json(info);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let updateSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.updateSpecialty(req.body);
    return res.status(200).json(info);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};
let getDetailSpecialtyById = async (req, res) => {
  try {
    let info = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
    return res.status(200).json(info);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};
module.exports = {
  createNewSpecialty,
  getAllSpecialty,
  deleteSpecialty,
  updateSpecialty,
  getDetailSpecialtyById,
};
