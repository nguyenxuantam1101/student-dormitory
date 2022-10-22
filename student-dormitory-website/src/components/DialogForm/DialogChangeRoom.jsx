import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { memo } from 'react';
import Select from 'react-select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogChangeRoom(props) {
  const { open, onOpenDialog, onAgreeAction } = props;
  const registerOptions = [
    { value: 180, label: '6 Tháng' },
    { value: 360, label: '12 Tháng' },
  ];
  const [timeIn, setTimeIn] = React.useState(0);
  const handleExtendTimeIn = (e) => {
    setTimeIn(e.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onOpenDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Bạn Đang Thực Hiện Yêu Cầu Đổi Phòng</DialogTitle>
        <DialogContent>
          <div className="item">
            <span className="title">Chọn Thời Gian Ở:</span>
            <Select
              name="registerOption"
              onChange={handleExtendTimeIn}
              options={registerOptions}
              value={registerOptions?.filter(function (option) {
                return option.value === timeIn;
              })}
              placeholder="--Chọn--"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={onOpenDialog} style={{ fontSize: '13px' }}>
            Không đồng ý
          </Button>
          <Button style={{ fontSize: '13px' }} variant="outlined" color="success" onClick={() => onAgreeAction(timeIn)}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default memo(DialogChangeRoom);
