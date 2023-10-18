import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required:true,
    },
    email: {
        type: String,
        match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
        ],
       required:true,
    },
    password: {
        type: String,
        required: true,
        minLength:6,
    },
    refreshToken: {
        type:[String]
    }
}, { timestamps: true })



userSchema.pre('save', async function (next){
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

}
)

userSchema.methods.checkPassword = async function(pass){
    return await bcrypt.compare(pass, this.password);
}


export default mongoose.model('User', userSchema)