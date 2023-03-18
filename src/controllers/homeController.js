import express from "express"
import db from '../models/index'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req,res)=>{
    try{
        let data= await  db.User.findAll()
        return res.render("homepage.ejs", {
            data:JSON.stringify(data)
        })
    }catch(e){
        console.log(e);
    }
}

let getCRUD = (req, res)=>{
    return res.render('crud.ejs')
}

let postCRUD =  async (req, res)=>{
    let message= await CRUDService.createNewUser(req.body)
    console.log(message);
    return res.send('post crus')
}

let diplayGetCRUD = async (req,res)=>{
    let data= await CRUDService.getAllUser()
    return res.render('display-CRUD.ejs',{
        dataTable:data
    })
}

let getEditCRUD=async(req,res)=>{
    let userId=req.query.id
    if(userId){
        let userData=await CRUDService.getUserInfoById(userId)
        // console.log('---------');
        // console.log(userData);

        return res.render('editCRUD.ejs', {
            userData:userData
        })
    }
    else{
        return res.send('Users not found!')
    }
}

let putCRUD = async(req, res)=>{
    let data= req.body
    let allUsers= await CRUDService.updateUserData(data)
    return res.render('display-CRUD.ejs',{
        dataTable:allUsers
    })
}

let deleteCRUD = async(req,res)=>{
    let userId=req.query.id
    if(userId){
        let allUsers= await CRUDService.deleteUserById(userId)
        
        return res.send('delete success')
    }else{
        return res.send('found!')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD:getCRUD, 
    postCRUD:postCRUD,
    diplayGetCRUD:diplayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD,
}