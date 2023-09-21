const express = require("express");

const bookRouter = express.Router();

const BookModel = require("../model/bookModel");

const auth = require("../middlewear/auth")


// get all books

bookRouter.get("/books", async(req,res) =>{

    try {
        const books = await BookModel.find();

        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
})

// get book by id


bookRouter.get("/books/:id", async(req,res) =>{

    try {
        const book = await BookModel.findById(req.params.id);

        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
})


// /api/books?category=fiction

bookRouter.get("/books", async(req,res) =>{

    try {
        const category = req.query.category; 
        const books = await BookModel.find({ category: category }); 

        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})


// /api/books?author=corey&category=fiction

bookRouter.get("/books/author/:author", async(req,res) =>{

    try {
        const author = req.params.author; 
        const category = req.query.category; 

        const books = await BookModel.find({ author: author, category: category });

        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})


// /api/books

bookRouter.post("/books", auth, async(req,res) =>{

    try {
        const { title,
            author,
            category,
            price,
            quantity} = req.body;

            const book = new BookModel(req.body)
            await book.save();

            res.status(201).json(book)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// /api/books/:id

bookRouter.patch("/books/:id",auth, async(req, res) =>{
    try {
        const {id} = req.params;

        await BookModel.findByIdAndUpdate(id, req.body);

        res.status(204).json({"msg":"Book details updated succesfullly"})

    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

// /api/books/:id

bookRouter.delete("/books/:id", auth, async(req, res) =>{
    try {
        const {id} = req.params;
        await BookModel.findByIdAndDelete(id);

        res.status(202).json({"msg":"Book details deleted succesfullly"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

module.exports = bookRouter
