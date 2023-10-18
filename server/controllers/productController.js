import productModel from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler"
import mongoose from "mongoose";

const getAllProducts = expressAsyncHandler(async (req, res) => {
    // console.log(req.query);
    let products = {};
    if (!req.query.tag) {
        products = await productModel.find({});
        // console.log({products});
         return res.status(200).json({
         products
         })
    }
    products = await productModel.find({ tag: req.query.tag });
    
    

    return res.status(200).json({
        products
    })
    
  
})

const createSingleProduct = expressAsyncHandler(async (req, res) => {
    
    if (!req.body) {
        res.status(400)
        throw new Error('body is Empty');
    }
    // console.log(req.body)
    const product = await productModel.create({
          ...req.body,
    })

    return res.status(201).json({
        ...product._doc
    })
})

const getSingleProduct = expressAsyncHandler(async (req, res) => {
    const proId = req.params.id;
    if (!proId) {
        res.status(400)
        throw new Error('Invalid ID');
    }
    // console.log(req.params);
    // const objId = new mongoose.Types.ObjectId(proId)
    // console.log(objId);
    const product = await productModel.findById({ _id:proId});
    // console.log(product);
    if (!product) {
        res.status(404)
        throw new Error(`Product with Id ${proId} is Not Found`);
    }
    return res.status(200).json({
        product
    })
}
)

//ADMIN ONLY SO AFTERWARDS
const editSingleProduct = (req, res) => {
     res.status(200).json({
        ...req.body
    })
}

const deleteSingleProduct = (req, res) => {
     res.status(200).json({
        ...req.body
    })
}

export {
    createSingleProduct,
    getAllProducts,
    getSingleProduct,
    editSingleProduct,
    deleteSingleProduct
}