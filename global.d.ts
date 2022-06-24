interface PaymentFromData {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  amount: string;
}

interface ResponseData {
  requestId: string;
  amount: number;
}
