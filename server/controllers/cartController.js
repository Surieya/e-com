import expressAsyncHandler from "express-async-handler"
import cartModel from "../models/cartModel.js"
import mongoose from "mongoose";


export const getCart = expressAsyncHandler(async(req, res) => {
    // const userId = req.params.id;
    //   req.user = { _id: foundUser._id, email: foundUser.email, userName: foundUser.userName }
    const {_id:userId} = req.user
    if (!userId) {
        res.status(401);
        throw new Error('Sorry User Id Does not exist');
    }
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
        return res.status(200).json({
            msg:"Sorry No Products in Cart"
        })
        // throw new Error('No cart Exist');
    }
    let totalPrice = 0;
    const { products } = cart;
    products.forEach((p) => {
        console.log(p);
        const { quantity, productPrice } = p;
        totalPrice += Number(quantity * productPrice)
    })
    console.log(totalPrice);
    return res.status(200).json({
        cart,
        totalPrice
    })

})


// export const createCart = expressAsyncHandler(async (req, res) => {
//     const { _id: userId } = req.user
//     console.log(req.body)
//      if (!userId) {
//         res.status(401);
//         throw new Error('Sorry User Id Does not exist');
//     }
//     const cart = await cartModel.create({
//         ...req.body
//     })
//      if (!cart) {
//         res.status(400)
//         throw new Error('No cart Exist');
//     }
//     return res.status(200).json({
//         cart
//     })
// })

// export const updateCart = expressAsyncHandler(async(req, res) => {
//     // const userId = req.params.id;
//     const {_id:userId} = req.user
//      if (!userId) {
//         res.status(401);
//         throw new Error('Sorry User Id Does not exist');
//     }
//     const queries = req.query;
//     if (!req.body) {
//          res.status(401);
//         throw new Error('Provide Proper queries');
//     }
//     let cart = await cartModel.findOne({
//        userId 
//     })
//     if (cart) {
//          if (req.body.inc && req.body.proId && mongoose.Types.ObjectId.isValid(req.body.proId)) {
//         let newProducts = cart.products.map((product) => {
//             console.log(product.productId);
//            if (product.productId.equals(new mongoose.Types.ObjectId(req.body.proId))) {
//                console.log('success');
//                 product.quantity += req.body.inc;
//             }
//             return product;
//        })
//         // cart = { ...cart, products: newProducts };
//         console.log(newProducts);
//          cart.products = newProducts;
//         const res = await cart.save();
//         // console.log(res);
//     }
//     if (queries.add && req.body.proId) {
//         const newProduct = {
//             productId: req.body.proId,
//             quantity: req.body.quantity || 1,
//         }
//         const newProducts = [...cart.products, newProduct];
//         cart.products = newProducts;
//         await cart.save();

//     }
//     if (queries.remove && req.body.proId) {
//         const newProducts = cart.products.filter((product) => {
//             if (product.productId.equals(new mongoose.Types.ObjectId(req.body.proId))) return;
//             return product;
//         })
//          cart.products = newProducts;
//         // cart = { ...cart, products: newProducts };
//         await cart.save();

//     }
//     res.status(200).json({
//         cart
//     })
         
        
//     } else {
//         const cart = await cartModel.create({
//         ...req.body
//     })
//      if (!cart) {
//         res.status(400)
//         throw new Error('No cart Exist');
//     }
//     return res.status(200).json({
//         cart
//     })
//     }
   
//     // console.log(userId);
// })

export const updateProduct = expressAsyncHandler(async (req, res) => {
    const { proId } = req.params;
    const { _id: userId } = req.user;
    let newProducts = []
    const cart = await cartModel.findOne({
        userId
    })
    // console.log(cart.products);
    if (req.query.q) {

         newProducts = cart.products.map((product) => {
        if (product.productId.equals(new mongoose.Types.ObjectId(proId))) {
            product.quantity = Number(req.query.q)
             }
             return product;
         })
    }

    if (req.query.del) {
        newProducts = cart.products.filter((product) => {
            if (!product.productId.equals(new mongoose.Types.ObjectId(proId))) {
                return product;
            }
        }) 
        
        // console.log({newProducts})
    }
     cart.products = newProducts;
    const updatedCart = await cart.save();
    const { products } = updatedCart
    // console.log({products})
        return res.status(200).json({
            products
        })
    
})

export const addProduct = expressAsyncHandler(async (req, res) => {
    const { _id: userId } = req.user
    const { proId } = req.params
    // const { price } = req.body
    console.log(req.body);
    
     if (!userId) {
        res.status(401);
        throw new Error('Sorry User Id Does not exist');
    }
    // const queries = req.query;
    if (!req.body) {
         res.status(401);
        throw new Error('Provide Proper queries');
    }
    let cart = await cartModel.findOne({
       userId 
    })
    

    if (cart) {
        const duplicate = cart.products.filter((product) => {
            // console.log(product.productId, proId)
            if (product.productId.equals(new mongoose.Types.ObjectId(proId))) {
                
                return product
           }
        })
        const rest = cart.products.filter((product) => {
            if (!product.productId.equals(new mongoose.Types.ObjectId(proId))) {
                return product
            }
        })
        // console.log(duplicate)
        if (duplicate?.length > 0) {
            duplicate[0].quantity += duplicate.length;
            cart.products = [...rest, duplicate[0]];
            // const updatedCart = await cart.save();
            // const { products } = updatedCart;
            // return res.status(200).json({
            //     products
            // })
        }
        else {
            const newProduct = {
                productId: proId,
                productPrice:req.body.price,
                quantity:req.body.quantity || 1,
            }
        //      cart.products.push({
        //     productId: proId,
        //     quantity:req.body.quantity || 1,
            // })
            cart.products = [...rest, newProduct];
       
        }
         const updatedCart = await cart.save()
        const {products} = updatedCart
        return res.status(200).json({
           products
    })
       

    } else {
        const cart = await cartModel.create({
            userId,
            products: [
                {
                    productId: proId,
                }
            ]
        })
        const {products} = cart
        return res.status(201).json({
            products
        })
    }

    
})

//hold
export const deleteCart = expressAsyncHandler((req, res) => {
    const userId = req.params.id;
    // console.log(userId);
})

