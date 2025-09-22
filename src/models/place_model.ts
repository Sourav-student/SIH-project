import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  crowd: { type: String, required: true, enum: ["Low", "Medium", "High"] },
  info: {
    placeInfo: { type: String, default: "" },
    hospitals: { type: [String], default: [] },
    temperature: { type: String, default: "" },
    aqi: { type: String, default: "" },
    hotels: { type: [String], default: [] },
    feedbacks: { type: [String], default: [] },
  },
}, { timestamps: true });

const Place = mongoose.models.Place || mongoose.model("Place", PlaceSchema);
export default Place;