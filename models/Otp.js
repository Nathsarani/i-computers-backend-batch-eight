import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({      //Schema
    email : {
        type : String,
        required : true,
        unique : true
    
    },

    otp :{
        type : String,
        required:true,

    },
    



}

)
const Otp = mongoose.model("Otp",otpSchema) //model create  (User kiynne collection eke name ek,plural wel ynne mongo ekta)
export default Otp;  
