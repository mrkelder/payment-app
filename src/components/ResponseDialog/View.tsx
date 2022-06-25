import { FC } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { CommonProps } from "./ResponseDialog";

interface Props extends CommonProps {
  closeDialog: () => void;
}

const View: FC<Props> = ({ response, closeDialog }) => {
  return (
    <Dialog open={response.shouldShowDialog} onClose={closeDialog}>
      <DialogTitle id="alert-dialog-title">Информация о заказе</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Id Вашего заказа: {response.requestId}
        </DialogContentText>
        <DialogContentText>
          Количество заказанных чашек кофе: {response.amount} ☕
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Ок</Button>
      </DialogActions>
    </Dialog>
  );
};

export default View;
