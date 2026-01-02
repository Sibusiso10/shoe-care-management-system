import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import Order from "@/models/Orders";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let ordersIn = 0;
    let cancelledOrders = 0;
    let progressingOrders = 0;

    const orders = await Order.find({
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    for (const order of orders) {
      if (order.status === "pending") {
        ordersIn++;
      } else if (order.status === "cancelled") {
        cancelledOrders++;
      }
    }
    const orderprogress = await Order.find();

    for (const order of orderprogress) {
      if (order.status !== "pending" && order.status !== "cancelled") {
        // anything NOT pending or cancelled
        progressingOrders++;
      }
    }
console.log({
      ordersIn,
      cancelledOrders,
      progressingOrders,
    })
    return res.status(200).json({
      ordersIn,
      cancelledOrders,
      progressingOrders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default handler;
