import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import { memo } from 'react';
import Moment from 'moment';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const columnsHisReceipts = [
  {
    headerColumn: 'Giá Tiền',
  },
];

function DetailHistoryReceipts(props) {
  const formatNumber = (q) => {
    return q.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  const { open, onOpenDialog, detailReceipts } = props;
  const [priceReceipt, setPriceReceipt] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}costOfLiving`);
        setPriceReceipt(res.data?.costOfLivings);
      } catch (error) {
        console.log(error.response.data.message);
      }
    })();
  }, []);
  console.log(priceReceipt);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onOpenDialog}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Chi Tiết Điện Nước {Moment(detailReceipts?.createdAt).format('DD/MM/YYYY')}</DialogTitle>
        <DialogContent className="dialog-receipt">
          <DialogContent className="his-receipts">
            {detailReceipts?.detailBillCostOfLiving?.map((cost) => (
              <div className="item-bill-cost-of-living" key={cost._id}>
                <div className="name-cost-spending">
                  <DialogContentText className="title">Tên dịch vụ: </DialogContentText>
                  <DialogContentText className="value"> {cost?.nameCost?.nameCost}</DialogContentText>
                </div>
                <div className="amount-use-spending">
                  <div className="amount-use">
                    <DialogContentText className="title">Chỉ số đầu: </DialogContentText>
                    <DialogContentText className="value"> {cost?.amountUseOld}</DialogContentText>
                  </div>
                  <div className="amount-use">
                    <DialogContentText className="title">Chỉ số cuối: </DialogContentText>
                    <DialogContentText className="value"> {cost?.amountUseNew}</DialogContentText>
                  </div>
                  <div className="amount-use">
                    <DialogContentText className="title">Số tiêu thụ: </DialogContentText>
                    <DialogContentText className="value"> {cost?.amountUseNew - cost?.amountUseOld}</DialogContentText>
                  </div>
                </div>
                <div className="total-price">
                  <DialogContentText className="title">Số tiền: </DialogContentText>
                  <DialogContentText className="value">
                    {formatNumber((cost?.amountUseNew - cost?.amountUseOld) * cost?.nameCost?.priceCost)}
                  </DialogContentText>
                </div>
              </div>
            ))}
          </DialogContent>
          <DialogContent className="table-price-receipt">
            {priceReceipt?.map((price) => {
              return (
                <div key={price._id}>
                  <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                      <TableHead style={{ backgroundColor: 'gray' }}>
                        <TableRow>
                          <TableCell style={{ color: 'white' }}>Giá {price.nameCost}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell className="tableCell">
                            <DialogContentText className="value-table-cell">{price.priceCost}</DialogContentText>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              );
            })}
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default memo(DetailHistoryReceipts);
