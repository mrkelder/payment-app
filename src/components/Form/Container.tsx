import {
  FC,
  useEffect,
  FormEventHandler,
  useState,
  ChangeEventHandler,
  useCallback,
} from "react";

import type { InputHandler, FormError } from "./Form";

import View from "./View";

const defaultFormError: FormError = {
  cardNumber: false,
  expirationDate: false,
  cvv: false,
  amount: false,
};

const defaultFormData: PaymentFromData = {
  cardNumber: "",
  expirationDate: "",
  cvv: "",
  amount: "",
};

const Container: FC = () => {
  const [formData, setFormData] = useState<PaymentFromData>(defaultFormData);
  const [formError, setFormError] = useState<FormError>(defaultFormError);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { cardNumber, expirationDate, cvv, amount } = formData;

  const isCardNumberValid = /^\d{16}$/g.test(cardNumber);
  const isExpirationDateValid = /^\d{2}\/\d{4}$/g.test(expirationDate);
  const isCvvValid = /^\d{0,3}$/g.test(cvv);
  const isAmountValid = /^\d+$/g.test(amount) && +amount > 0;

  const formIsValid =
    isCardNumberValid && isExpirationDateValid && isCvvValid && isAmountValid;

  useEffect(() => {
    setIsSubmitDisabled(!formIsValid);
  }, [formIsValid]);

  function changeFormError(name: keyof FormError, value: boolean): void {
    setFormError((prev) => ({ ...prev, [name]: value }));
  }

  const submitHandler: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isCardNumberValid) changeFormError("cardNumber", true);
      if (!isExpirationDateValid) changeFormError("expirationDate", true);
      if (!isCvvValid) changeFormError("cvv", true);
      if (!isAmountValid) changeFormError("amount", true);

      if (formIsValid) {
        const response = await fetch(
          process.env.NEXT_PUBLIC_HOST + "/api/sendPayment",
          { method: "POST", body: JSON.stringify(formData) }
        );

        if (response.ok) {
          const data = (await response.json()) as ResponseData;

          const customEvent = new CustomEvent("successful_response", {
            detail: { ...data, shouldShowDialog: true },
          });

          dispatchEvent(customEvent);
        }
      }
    },
    [
      formData,
      formIsValid,
      isAmountValid,
      isCardNumberValid,
      isCvvValid,
      isExpirationDateValid,
    ]
  );

  const formChangeHandler = useCallback(() => {
    const isFormErrorDefault =
      JSON.stringify(defaultFormError) === JSON.stringify(formData);

    if (!isFormErrorDefault) setFormError(defaultFormError);
  }, [formData]);

  const changeInputValue = useCallback((name: keyof PaymentFromData) => {
    const changeHandler: ChangeEventHandler<HTMLInputElement> = ({
      target: { value },
    }) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return changeHandler;
  }, []);

  return (
    <View
      submitHandler={submitHandler}
      formChangeHandler={formChangeHandler}
      changeInputValue={changeInputValue}
      isSubmitDisabled={isSubmitDisabled}
      formData={formData}
      formError={formError}
    />
  );
};

export default Container;
