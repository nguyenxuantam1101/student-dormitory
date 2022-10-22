import './styleDialog.scss';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Select from 'react-select';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { memo } from 'react';
import useLocationForm from '~/components/Province/useLocationForm';
import axios from 'axios';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';
import { createAxios } from '~/utils/createInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogEditContactInfo(props) {
  const { open, onOpenDialog, infoContact } = props;
  const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);
  const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const EditContactInfo = async () => {
    try {
      const res = await axiosJWT.put(
        `${process.env.REACT_APP_API}student/update`,
        {},
        {
          headers: { token: `Bearer ${user?.accessToken}` },
        },
      );
      showToastSuccess(res.data.message, 3000);
    } catch (error) {
      showToastError(error.response.data.message, 3000);
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
        <DialogContent>
          <DialogTitle style={{ textAlign: 'center', padding: '0' }}>Thay Đổi Thông Tin Liên Hệ</DialogTitle>
          <hr />
          <div className="editStudentItem">
            <label>Địa Chỉ Thường Trú</label>
            <input type="text" placeholder="01 Trần Hưng Đạo" id="address" defaultValue={infoContact?.address} />
            <label style={{ marginTop: '10px' }}>Tỉnh/Thành</label>
            <Select
              style={{ width: '900px' }}
              name="cityId"
              isDisabled={cityOptions.length === 0}
              options={cityOptions}
              onChange={(option) => onCitySelect(option)}
              placeholder={infoContact?.province || '--Tỉnh/Thành--'}
              defaultValue={selectedCity || infoContact?.province}
            />
            <label>Quận/Huyện</label>
            <Select
              name="districtId"
              isDisabled={districtOptions.length === 0}
              options={districtOptions}
              onChange={(option) => onDistrictSelect(option)}
              placeholder={infoContact?.district || '--Quận/Huyện--'}
              defaultValue={selectedDistrict || infoContact?.district}
            />
            <label>Phường/Xã</label>
            <Select
              name="wardId"
              isDisabled={wardOptions.length === 0}
              options={wardOptions}
              placeholder={infoContact?.ward || '--Phường/Xã--'}
              onChange={(option) => onWardSelect(option)}
              defaultValue={selectedWard || infoContact?.ward}
            />
          </div>
          <div className="editStudentItem" style={{ marginTop: '-20px' }}>
            <label>Số Điện Thoại</label>
            <input type="text" placeholder="0947999XXX" id="numberPhone" defaultValue={infoContact?.numberPhone} />
          </div>
          <div className="editStudentItem" style={{ marginTop: '-13px' }}>
            <label>Gmail</label>
            <input
              required
              type="gmail"
              placeholder="nguyenxuana@gmail.com"
              id="email"
              defaultValue={infoContact?.email}
            />
          </div>
          <hr></hr>
          <div className="form-button">
            <button className="btn-cancel" onClick={onOpenDialog}>
              Hủy
            </button>
            <button className="btn-edit">Sửa</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default memo(DialogEditContactInfo);
