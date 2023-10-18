import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required:true,
    },
    tag: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required:true,
    },
    count: {
        type: Number,
        default:1,
    },
    imgUrl: {
        type: String,
        required: true
    }
})


export default mongoose.model('product', productSchema);