import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone_no: {
    type: Number
  },
  email : {
    type : String,
    required : true
  },
  user_name : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required  :true
  },
  image : {
    type : String
  },
  name : {
    type : String
  },
  role : {
    type : String,
    default : "user"
  }
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;