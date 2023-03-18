import patientService from "../services/patientService"
let postPatientBookAppointment =async(req, res)=>{
    try{
        let info=await patientService.postPatientBookAppointment(req.body)
        return res.status(200).json(info)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode:-1,
            message:'Error from the server'
        })
    }
}

let postVerifyBookAppointment =async(req, res)=>{
    try{
        let info=await patientService.postVerifyBookAppointment(req.body)
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
    postPatientBookAppointment,
    postVerifyBookAppointment,
}