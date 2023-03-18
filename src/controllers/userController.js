import express from "express"
import db from "../models/index"
import userService from "../services/userService"

let handleLogin=async(req,res)=>{
    let email = req.body.email
    let password =req.body.password
    //check email empty
    if(!email || !password){
        return res.status(500).json({
            errCode:1,
            message:'Missing inputs parameter!'
        })
    }

    let userData =await userService.handleUserLogin(email,password)
    
    return res.status(200).json({
        errCode:userData.errCode,
        message:userData.message,
        userData
    })
}

let handleGetAllUsers =async(req,res)=>{
    let id=req.query.id//ALL single
    if(!id){
        return res.status(200).json({
            errCode:1,
            errMessage:'Missing required parameters!',
            users:[]
        })
    }

    let users = await userService.getAllUsers(id)
    
    return res.status(200).json({
        errCode:0,
        errMessage:'success!',
        users
    })
}

let handleCreateNewUser=async(req,res)=>{
   let message =await userService.createNewUser(req.body)
   return res.status(200).json(message)
}

let handleDeleteUser =async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            message:'Mising required parameters!'
        })
    }
    let message =await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}

let handleEditUser=async(req,res)=>{
    let data= req.body
    let message= await userService.updateUserData(data)
    return res.status(200).json(message)
}

let getAllCode = async(req,res)=>{
    try{
         let data= await userService.getAllcodeService(req.query.type)
        return res.status(200).json({
            errCode:0,
            errMessage:'success!',
            data
         })
        
    }catch(err){
        return res.status(200).json({
            errCode:-1,
            message:'Error from server'
        })
    }
}

module.exports ={
    handleLogin:handleLogin,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUser:handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser,
    getAllCode:getAllCode,
}