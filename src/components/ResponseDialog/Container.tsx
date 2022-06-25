import { FC, useCallback } from "react";
import { CommonProps } from "./ResponseDialog";

import View from "./View";

const Container: FC<CommonProps> = ({ response }) => {
  const closeDialog = useCallback(() => {
    const customEvent = new CustomEvent("close_dialog");
    dispatchEvent(customEvent);
  }, []);

  return <View response={response} closeDialog={closeDialog} />;
};

export default Container;
