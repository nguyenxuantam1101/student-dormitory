import Moment from 'moment';
import { useState } from 'react';
import { showToastError } from '~/utils/showToastMessage';
import DialogOptionPaymentInvoice from '~/components/DialogForm/DialogOptionPaymentInvoice';

function Invoices(props) {
  const { feeInvoice } = props;
  let date = new Date();
  const formatNumber = (q) => {
    return q.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  const [openDialogPaymentOptions, setOpenDialogPaymentOptions] = useState(false);
  const handleOpenPaymentOptions = () => {
    if (feeInvoice?.statusInvoice === true) {
      showToastError('Hóa Đơn Đã Thanh Toán!', 1500);
    } else {
      setOpenDialogPaymentOptions(!openDialogPaymentOptions);
    }
  };

  return (
    <div className="card-invoices">
      <div className="invoicesItem">
        <span className="itemTitleInvoices">Hóa đơn của: </span>
        <span className="itemValueInvoices"> {feeInvoice?.student?.nameStudent}</span>
      </div>
      <div className="invoicesItem">
        <span className="itemTitleInvoices">Phòng: </span>
        <span className="itemValueInvoices"> {feeInvoice?.roomBuilding?.name}</span>
      </div>
      <div className="invoicesItem">
        <span className="itemTitleInvoices">Thời gian ở: </span>
        <span className="itemValueInvoices">
          {feeInvoice?.student?.registrationAtDormitory?.timeIn &&
            feeInvoice?.student?.registrationAtDormitory?.timeIn / 30}
          {' (Tháng)'}
        </span>
      </div>
      <div className="invoicesItem">
        <span className="itemTitleInvoices">Số tiền phải trả: </span>
        <span className="itemValueInvoices"> {formatNumber(feeInvoice?.totalPrice)}</span>
      </div>
      <div className="invoicesItem">
        <span className="itemTitleInvoices">Trạng thái: </span>
        <span
          className="itemValueInvoices"
          style={feeInvoice?.statusInvoice !== true ? { color: 'red' } : { color: 'green' }}
        >
          {feeInvoice?.statusInvoice === true ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </span>
      </div>
      <div className="invoicesItem">
        <span className="itemTitleInvoices">Hạn cuối: </span>
        <span className="itemValueInvoices" style={feeInvoice?.dateLine > date ? { color: 'red' } : {}}>
          {Moment(feeInvoice?.dateLine).format('DD-MM-YYYY')}
        </span>
      </div>
      <div className="invoicesItem">
        <span className="itemTitleInvoices">Ngày lập: </span>
        <span className="itemValueInvoices"> {Moment(feeInvoice?.createdAt).format('DD-MM-YYYY: hh:mm:ss')}</span>
      </div>
      <div className="action-btn">
        <div>
          <button className="btn-pay" onClick={handleOpenPaymentOptions}>
            Thanh Toán
          </button>
        </div>
      </div>
      <DialogOptionPaymentInvoice
        open={openDialogPaymentOptions}
        onOpenDialog={handleOpenPaymentOptions}
        invoice={feeInvoice}
      />
    </div>
  );
}

export default Invoices;
