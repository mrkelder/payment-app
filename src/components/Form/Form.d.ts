export type InputHandler = ChangeEventHandler<HTMLInputElement>;

export interface FormError {
  cardNumber: boolean;
  expirationDate: boolean;
  cvv: boolean;
  amount: boolean;
}
