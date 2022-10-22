import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.red[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function DialogShareMoney(props) {
  //   const [openDialog, setOpenDialog] = useState(false);

  //   const handleClickOpenDialog = () => {
  //     setOpenDialog(true);
  //   };
  //   const handleClickCloseDialog = () => {
  //     setOpenDialog(false);
  //   };
  const { open, openDialog, onClose } = props;

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpenDialog}>
        Open dialog
      </Button> */}
      <BootstrapDialog onClose={openDialog} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          Chia Tiền Hóa Đơn Điện Nước
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Tổng Tiền: {22222}</Typography>
          <Typography gutterBottom>
            Chia: <input type="number" min={2} max={4}></input>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default DialogShareMoney;
