import './invoicesReceipts.scss';
// import DialogShareMoney from '../Information/DialogShareMoney/DialogShareMoney';
import Moment from 'moment';
import { useState } from 'react';
import DialogOptionPayment from '~/components/DialogForm/DialogOptionPayment';
import { showToastError } from '~/utils/showToastMessage';

function Receipts(props) {
  const { receiptOfRoom, room } = props;
  const formatNumber = (q) => {
    return q.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  // const [openDialog, setOpenDialog] = useState(false);
  // const handleShareMoney = () => {
  //   setOpenDialog(!openDialog);
  // };
  // console.log(openDialog);
  const [openDialogPaymentOptions, setOpenDialogPaymentOptions] = useState(false);
  const handleOpenPaymentOptions = () => {
    if (receiptOfRoom?.statusBill === true) {
      showToastError('Hóa Đơn Đã Thanh Toán!', 1500);
    } else {
      setOpenDialogPaymentOptions(!openDialogPaymentOptions);
    }
  };

  return (
    <div className="card-receipts">
      <div className="receiptsItem">
        <span className="itemTitleReceipts">Phòng: </span>
        <span className="itemValueReceipts">{receiptOfRoom?.Room?.name || room}</span>
      </div>
      <div className="receiptsItem">
        <span className="itemTitleReceipts">Ngày Chốt Chỉ Số: </span>
        <span className="itemValueReceipts">{Moment(receiptOfRoom?.createdAt).format('DD-MM-YYYY')}</span>
      </div>
      <div className="receiptsDetail">
        <span className="itemTitleReceipts">Chi Tiết Hóa Đơn:</span>
        <div className="detail-receipts">
          {receiptOfRoom?.detailBillCostOfLiving?.map((cost) => (
            <div className="item-bill-cost-of-living" key={cost._id}>
              <div className="name-cost-spending">
                <span className="title">Tên dịch vụ: </span>
                <span className="value"> {cost?.nameCost?.nameCost}</span>
              </div>
              <div className="amount-use-spending">
                <div className="amount-use">
                  <span className="title">Chỉ số đầu: </span>
                  <span className="value"> {cost?.amountUseOld}</span>
                </div>
                <div className="amount-use">
                  <span className="title">Chỉ số cuối: </span>
                  <span className="value"> {cost?.amountUseNew}</span>
                </div>
                <div className="amount-use">
                  <span className="title">Số tiêu thụ: </span>
                  <span className="value"> {cost?.amountUseNew - cost?.amountUseOld}</span>
                </div>
              </div>
              <div className="total-price">
                <span className="title">Số tiền: </span>
                <span className="value">
                  {formatNumber((cost?.amountUseNew - cost?.amountUseOld) * cost?.nameCost?.priceCost)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="receiptsItem">
        <span className="itemTitleReceipts">Tổng Tiền: </span>
        <span className="itemValueReceipts">{formatNumber(receiptOfRoom?.totalPayment)}</span>
      </div>
      <div className="receiptsItem">
        <span className="itemTitleReceipts">Trạng Thái: </span>
        <span
          className="itemValueReceipts"
          style={receiptOfRoom?.statusBill !== true ? { color: 'red' } : { color: 'green' }}
        >
          {receiptOfRoom?.statusBill === true ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </span>
      </div>
      <div className="receiptsItem">
        <span className="itemTitleReceipts">Ghi Chú: </span>
        <span className="itemValueReceipts">
          {receiptOfRoom?.notePayment === null ? 'Không Có' : receiptOfRoom?.notePayment}
        </span>
      </div>
      <div className="receiptsItem">
        <span className="itemTitleReceipts">Người Tạo: </span>
        <span className="itemValueReceipts">{receiptOfRoom?.staffCreate?.nameStaff}</span>
      </div>
      {/* {openDialog && <DialogShareMoney open={openDialog} onOpenDialog={handleShareMoney} />} */}
      <div className="action-btn">
        {/* <div>
          <button className="btn-share">Chia Tiền</button>
        </div> */}
        <div>
          <button className="btn-pay" onClick={handleOpenPaymentOptions}>
            Thanh Toán
          </button>
        </div>
      </div>
      <DialogOptionPayment
        open={openDialogPaymentOptions}
        onOpenDialog={handleOpenPaymentOptions}
        receipt={receiptOfRoom}
      />
    </div>
  );
}

export default Receipts;
