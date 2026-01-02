import mongoose from "mongoose";

const UserLocation = new mongoose.Schema({
    name: {type: String, required: true},
    houseBuildingNumber: {type: String, required: true},
    buildingStreetName: {type: String, required: true},
    country: {type: String, required: true},
    province: {type: String, required: true},
    cityTown: {type: String, required: true},
    suburbTownship: {type: String, required: true},
    extension: {type: String, required: true},
    postalCode: {type: String, required: true},
    latitude: Number,
    longitude: Number,
    userId: {type: String, required: true}
}); 

export default mongoose.models.userLocation || mongoose.model("userLocation", UserLocation);