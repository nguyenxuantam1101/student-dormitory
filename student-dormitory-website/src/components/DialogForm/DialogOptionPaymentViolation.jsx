import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { memo } from 'react';
import axios from 'axios';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogOptionPayment(props) {
  const { open, onOpenDialog, violation } = props;
  const linkRef = React.useRef();
  const handlePayByMomo = async (payByMomo) => {
    try {
      const id = violation?._id;
      const res = await axios.get(`${process.env.REACT_APP_API}violationRecord/show-display-momo/${id}`);
      showToastSuccess(res.data?.message);
      linkRef.current.href = res?.data?.urlMoMo;
      linkRef.current.click();
    } catch (error) {
      showToastError(error.response.data?.message);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onOpenDialog}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>{'Chọn Phương Thức Thanh Toán'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Thanh Toán Qua Ví Điện Tử</DialogContentText>
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
            alt="Thanh Toán Momo"
            style={{ width: '100px', height: '100px', cursor: 'pointer' }}
            onClick={(payByMomo) => handlePayByMomo(payByMomo)}
          />
          <a ref={linkRef} target="_blank" href="" style={{ display: 'none' }}></a>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default memo(DialogOptionPayment);
