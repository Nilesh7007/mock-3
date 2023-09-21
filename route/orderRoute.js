const express = require("express");

const orderRouter = express.Router();

const OrderModel = require("../model/orderModel");

const BookModel = require("../model/bookModel");


const UserModel = require("../model/userModel");



// /api/order      post

orderRouter.post("/order", async(req,res) =>{

    try {
        
        const { user,books} =  req.body;

        const checkUser = await UserModel.findById(user);

        const checkBooks = await BookModel.findById(books)

        if(!checkUser || !checkBooks){
            res.status(400).json({msg:"user or book not found"});

        }

        const order = new OrderModel(req.body);
        await order.save();

        res.status(201).json({msg: "Order sucefully"})
    } catch (error) {
        res.status(400).json({msg:error.msg})
    }
})


// get all orders

orderRouter.get("/orders",  async(req,res)=>{

    try {
        const orders = await OrderModel.find().populate({
            path:"user",
            model:"User"
        })
        .populate({
            path:"books",
            model: "Book"
        })

        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({msg:error.msg})
    }

})

module.exports = orderRouter;