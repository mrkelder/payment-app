import { Schema, model, models, Model } from "mongoose";

import { PAYMENT_MODEL_NAME } from "./CONSTANTS";

type PaymentModel = Model<{
  cardNumber: number;
  expirationDate: string;
  cvv: number;
  amount: number;
}>;

const paymentSchema = new Schema({
  cardNumber: { required: true, type: Number },
  expirationDate: { required: true, type: String },
  cvv: { required: true, type: Number },
  amount: { required: true, type: Number },
});

export default (models[PAYMENT_MODEL_NAME] ||
  model(PAYMENT_MODEL_NAME, paymentSchema)) as PaymentModel;
