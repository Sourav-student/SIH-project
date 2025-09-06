import mongoose from "mongoose";

const galarySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  public_id: { 
    type: String, 
    required: true 
  },
  privacy: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required : true
  }
  
}, { timestamps: true })

const Galary = mongoose.models.Galary || mongoose.model("Galary", galarySchema);

export default Galary;