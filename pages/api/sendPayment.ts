import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect, connection } from "mongoose";
import Payment from "../../src/models/Payment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const formData = JSON.parse(req.body) as PaymentFromData;
    const { cardNumber, expirationDate, cvv, amount } = formData;

    await connect(process.env.MONGODB_HOST as string);

    const newPayment = new Payment({
      cardNumber: +cardNumber,
      expirationDate,
      cvv: +cvv,
      amount: +amount,
    });

    await newPayment.save();

    res.status(200).json({ requestId: newPayment.id, amount: +amount });
  } catch {
    res.status(500).end();
  } finally {
    if (connection.readyState === 1) await disconnect();
  }
}
