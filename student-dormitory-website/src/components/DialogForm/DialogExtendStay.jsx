import './styleDialog.scss';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { memo } from 'react';
import Moment from 'moment';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';
import { createAxios } from '~/utils/createInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';
import { DialogContent } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogExtendStay(props) {
  const { open, onOpenDialog, timeIn, registration } = props;
  const formatNumber = (q) => {
    return q?.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const handleConfirmExtendDay = async () => {
    try {
      const res = await axiosJWT.put(
        `${process.env.REACT_APP_API}student/extendDayStay`,
        {
          timeIn,
        },
        {
          headers: { token: `Bearer ${user?.accessToken}` },
        },
      );
      showToastSuccess(res.data.message, 3000);
    } catch (error) {
      showToastError(error.response.data.message, 3000);
    }
  };
  let expirationDate = new Date(Date.parse(registration?.dateCheckOutRoom) + timeIn * 86400000);

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
        <DialogContent>
          <div className="popup-fee-invoice-preview">
            <div className="content-fee-invoice-preview">
              <div className="box-header-title">
                <span className="title-fee-invoice-preview">Hóa đơn lệ phí tạm tính</span>
              </div>
              <div className="content-details-fee-invoice-preview">
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Họ tên người nhận: </span>
                  <span className="itemValueFee"> {registration?.student?.nameStudent}</span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Số điện thoại: </span>
                  <span className="itemValueFee"> {registration?.student?.numberPhone}</span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Email: </span>
                  <span className="itemValueFee"> {registration?.student?.email}</span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Phòng ở: </span>
                  <span className="itemValueFee"> {registration?.student?.roomBuilding?.Room?.name}</span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Giường số: </span>
                  <span className="itemValueFee"> {registration?.student?.roomBuilding?.Bed}</span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Giá thuê: </span>
                  <span className="itemValueFee">
                    {formatNumber(registration?.student?.roomBuilding?.Room?.priceRoom)}
                  </span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Ngày gia hạn: </span>
                  <span className="itemValueFee"> {Moment(registration?.dateCheckOutRoom).format('DD/MM/YYYY')}</span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Ngày hết hạn: </span>
                  <span className="itemValueFee"> {Moment(expirationDate).format('DD/MM/YYYY')}</span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Thời gian ở: </span>
                  <span className="itemValueFee"> {timeIn / 30}(Tháng)</span>
                </div>
              </div>
              <div className="details-bottom-content">
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Tổng tiền phải thanh toán: </span>
                  <span className="itemValueFee">
                    {formatNumber(registration?.student?.roomBuilding?.Room?.priceRoom * (timeIn / 30))}
                  </span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Ngày khởi tạo: </span>
                  <span className="itemValueFee"> {Moment(new Date()).format('DD/MM/YYYY')}</span>
                </div>
                <div className="details-fee-invoice-preview">
                  <span className="itemTitleFee">Nhân viên khởi tạo: </span>
                  <span className="itemValueFee"> {registration?.student?.nameStudent}</span>
                </div>
              </div>
            </div>
            <div className="details-fee-invoice-btn">
              <button className="btn-fee-invoice-preview btn-cancel" onClick={onOpenDialog}>
                Hủy
              </button>
              <button className="btn-fee-invoice-preview btn-agree" onClick={handleConfirmExtendDay}>
                Xác nhận
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default memo(DialogExtendStay);
