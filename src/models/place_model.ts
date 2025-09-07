import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  crowd: { type: String, required : true },
});

const Place = mongoose.models.Place || mongoose.model("Place", PlaceSchema);
export default Place;
