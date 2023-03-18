require('dotenv').config()
import nodemailer from 'nodemailer'
let sendSimpleEmail = async(dataSend)=>{
    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Booking Care Of TQB 👻" <trannhatvy090199@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "THÔNG TIN ĐẶT LỊCH KHÁM BỆNH", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
}

let getBodyHTMLEmail = (dataSend)=>{
  let result=''
  if(dataSend.language==='vi'){
    result=`
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>bạn nhận được email này vì đã đặt lịch khám bệnh online tại BookingCare Of TQB</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu thông tin đặt lịch trên là đúng sự thật,
     vui lòng bấm vào đường link phía dưới để xác nhận và hoàn tất thủ tục đặt lịch</p>
     <div><a href="${dataSend.redirecLink}">Bấm vào đây</a></div> 
     <div>Xin chân thành cảm ơn</div>
     `
  }
  if(dataSend.language==='en'){
    result=`
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you booked an online medical appointment at BookingCare Of TQB</p>
    <p>Information to schedule an appointment:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>

    <p>If the above booking information is true,
     Please click on the link below to confirm and complete the booking procedure</p>
     <div><a href="${dataSend.redirecLink}">Click here</a></div> 
     <div>Thanks</div>
    `
  }
  return result
}

  
module.exports={
    sendSimpleEmail
}