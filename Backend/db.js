import mongoose from "mongoose";

export const db = () => {
    mongoose.connect("mongodb://localhost:27017/payment")
    .then(() => { 
        console.log("connected successfully") 
    })
    .catch((err) => {
        console.log(err)
    })
}