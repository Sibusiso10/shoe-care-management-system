import connectDB from "@/lib/db";
import Account from "@/models/Account";
import UserLoaction from "@/models/UserLocation";
import { NextApiRequest, NextApiResponse } from "next";

const SaveUserLocation = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await connectDB();
    const data = req.body;
    const exists = await UserLoaction.findOne({
      name: data.name.trim().toLowerCase(),
      houseBuildingNumber: data.houseBuildingNumber.trim().toLowerCase(),
      extension: data.extension.trim().toLowerCase(),
      userId: data.userId,
    });

    if (!exists) {
      const save = await UserLoaction.create({
        name: data.name.trim().toLowerCase(),
        houseBuildingNumber: data.houseBuildingNumber.trim().toLowerCase(),
        buildingStreetName: data.buildingStreetName.trim().toLowerCase(),
        country: data.country.trim().toLowerCase(),
        province: data.province.trim().toLowerCase(),
        cityTown: data.cityTown.trim().toLowerCase(),
        suburbTownship: data.suburbTownship.trim().toLowerCase(),
        extension: data.extension.trim().toLowerCase(),
        postalCode: data.postalCode,
        latitude: data.latitude,
        longitude: data.longitude,
        userId: data.userId,
      });

      return res.status(201).json({ message: "Saved" });
    }

    return res.status(400).json({ message: "exists" });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default SaveUserLocation;
