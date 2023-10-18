import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    products: [
        {
            productId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref:'product'
            },
            quantity: {
                type: Number,
                default:1,
            },
            productPrice: {
                type: Number, 
            }
      }
    ]
})


export default mongoose.model('cart', cartSchema);