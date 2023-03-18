import db from "../models/index"
import bcrypt from 'bcryptjs'
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config()
let buildUrlEmail = (doctorId, token) =>{
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}
let postPatientBookAppointment = (dataInput)=>{
    return new Promise (async(resolve, reject)=>{
        try{
            if(!dataInput.email || !dataInput.doctorId || !dataInput.birthDay || !dataInput.timeType){
                resolve({
                    errCode:1,
                    message:'Missing requited parameter!',
                })
            }else{
                let token = uuidv4()
                await emailService.sendSimpleEmail({
                    reciverEmail:dataInput.email,
                    patientName:dataInput.fullName,
                    time:dataInput.timeString,
                    doctorName:dataInput.doctorName,
                    language:dataInput.language,
                    redirecLink:buildUrlEmail(dataInput.doctorId, token)
                })

                let data= await db.User.findOrCreate({
                    where:{email:dataInput.email},
                    raw:true,
                    nest:true,
                    defaults:{
                        email:dataInput.email,
                        roleId:'R3',
                    }
                })
                
                // creat a booking record
                if(data && data[0]){
                    await db.Booking.findOrCreate({
                        where:{ 
                            patientId:data[0].id,
                        },
                        defaults:{
                            statusId:'S1',
                            patientId:data[0].id,
                            doctorId:dataInput.doctorId,
                            date:dataInput.date,
                            birthDay:dataInput.birthDay,
                            timeType:dataInput.timeType,
                            token:token
                        }
                    })
                }
                resolve({
                    errCode:0,
                    message:"Succeed!",
                    data
                })
               
            }
            
        }catch(err){
            reject(err)
        }
    })
}

let postVerifyBookAppointment = (dataInput)=>{
    return new Promise (async(resolve, reject)=>{
        try{
            if(!dataInput.token||!dataInput.doctorId){
                resolve({
                    errCode:1,
                    message:'Missing requited parameter!',
                })
            }else{
                let appointment= await db.Booking.findOne({
                    where:{
                        token:dataInput.token, 
                        doctorId:dataInput.doctorId,
                        statusId:'S1'
                    },
                    raw:false
                })

                if(appointment){
                    appointment.statusId='S2'
                    await appointment.save()
                    resolve({
                        errCode:0,
                        message:'Update the appointment succeed!'
                    })
                }else{
                    resolve({
                        errCode:2,
                        message:"Appointment has been activated or does nor exist!"
                    })
                }
               
            }
            
        }catch(err){
            reject(err)
        }
    })
}
module.exports={
    postPatientBookAppointment,
    postVerifyBookAppointment,
}