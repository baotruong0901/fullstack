import doctorService from "../services/doctorService"

let getTopDoctorHome = async(req, res)=>{
    let limit=req.query.limit
    if(!limit) limit=10
    try{
        let response=await doctorService.getTopDoctorHomeService(+limit)
        return res.status(200).json(response)
    }catch(err){
        return res.status(200).json({
            errCode:-1,
            message:'Error from server...'
        })
    }
}

let getAllDoctor = async(req,res)=>{
    try{
        let doctors=await doctorService.getAllDoctor()
        return res.status(200).json(doctors)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode:-1,
            message:'Error from the server'
        })
    }
}

let postInfoDoctor=async(req,res)=>{
    try{
        let response=await doctorService.saveInfoDoctor(req.body)
        console.log(response);
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode:-1,
            message:'Error from the server'
        })
    }
}

let getInfoDoctorById=async(req,res)=>{
    try{
        let infor=await doctorService.getInfoDoctorById(req.query.id)
        return res.status(200).json(infor)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode:-1,
            message:'Error from server'
        })
    }
}

let bulkCreateSchdule = async(req,res)=>{
    try{
        let infor=await doctorService.bulkCreateSchdule(req.body)
        return res.status(200).json(infor)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode:-1,
            message:'Error from the server'
        })
    }
}
let getScheduleDoctorByDate = async(req,res)=>{
    try{
        let infor=await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date)
        return res.status(200).json(infor)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode:-1,
            message:'Error from the server'
        })
    }
}

let getExtraInfoDoctorById = async(req,res)=>{
    try{
        let info=await doctorService.getExtraInfoDoctorById(req.query.doctorId, req.query.date)
        return res.status(200).json(info)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode:-1,
            message:'Error from the server'
        })
    }
}
let getProfileDoctorById = async(req,res)=>{
    try{
        let info=await doctorService.getProfileDoctorById(req.query.doctorId)
        return res.status(200).json(info)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode:-1,
            message:'Error from the server'
        })
    }
}

module.exports={
    getTopDoctorHome:getTopDoctorHome,
    getAllDoctor:getAllDoctor,
    postInfoDoctor:postInfoDoctor,
    getInfoDoctorById:getInfoDoctorById,
    bulkCreateSchdule:bulkCreateSchdule,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
}