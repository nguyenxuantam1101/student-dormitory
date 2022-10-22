import Moment from 'moment';
import './invoicesReceipts.scss';
import DialogOptionPaymentViolation from '~/components/DialogForm/DialogOptionPaymentViolation';
import { showToastError } from '~/utils/showToastMessage';
import { useState } from 'react';

function Violation(props) {
  const { violation } = props;
  const formatNumber = (q) => {
    return q.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  const [openDialogPaymentOptions, setOpenDialogPaymentOptions] = useState(false);
  const handleOpenPaymentOptions = () => {
    if (violation?.statusBill === true) {
      showToastError('Phiếu Phạt Đã Được Đóng!', 1500);
    } else {
      setOpenDialogPaymentOptions(!openDialogPaymentOptions);
    }
  };

  return (
    <div className="card-violations">
      <div className="violationsItem">
        <span className="itemTitleViolations">Sinh Viên Vi Phạm: </span>
        <span className="itemValueViolations"> {violation?.student?.nameStudent}</span>
      </div>
      <div className="violationsDetail">
        <span className="itemTitleViolations">Nội Dung Vi Phạm: </span>
        <div className="detail-violations">
          {violation?.contentViolation?.map((violation) => (
            <div className="violationsItem-cost-living">
              <div className="name-cost-spending">
                <span className="title">Nội dung phạt: </span>
                <span className="value "> {violation?.violationsItemViolation?.nameRule}</span>
              </div>
              <div className="amount-use-spending">
                <div className="amount-use">
                  <span className="title">Số lần vi phạm: </span>
                  <span className="value "> {violation?.amountViolation}</span>
                </div>
                <div className="amount-use">
                  <span className="title">Hình thức phạt: </span>
                  <span className="value "> {violation?.itemViolation?.overcome}</span>
                </div>
              </div>
              <div className="total-price">
                <span className="title">Số tiền: </span>
                <span className="value">{formatNumber(violation?.itemViolation?.monetaryFine)}/Vi Phạm</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="violationsItem">
        <span className="itemTitleViolations">Tổng tiền: </span>
        <span className="itemValueViolations"> {formatNumber(violation?.totalViolationRecord)}</span>
      </div>
      <div className="violationsItem">
        <span className="itemTitleViolations">Trạng thái: </span>
        <span
          className="itemValueViolations"
          style={violation?.statusBill !== true ? { color: 'red' } : { color: 'green' }}
        >
          {violation?.statusBill === true ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </span>
      </div>
      <div className="violationsItem">
        <span className="itemTitleViolations">Ngày lập biên bản: </span>
        <span className="itemValueViolations">{Moment(violation?.createdAt).format('DD-MM-YYYY')}</span>
      </div>
      <div className="violationsItem">
        <span className="itemTitleViolations">Nhân viên thành lập: </span>
        <span className="itemValueViolations"> {violation?.staffCreate?.nameStaff}</span>
      </div>
      <div className="action-btn">
        <button className="btn-pay" onClick={handleOpenPaymentOptions}>
          Đóng Phạt
        </button>
      </div>
      <DialogOptionPaymentViolation
        open={openDialogPaymentOptions}
        onOpenDialog={handleOpenPaymentOptions}
        violation={violation}
      />
    </div>
  );
}

export default Violation;
