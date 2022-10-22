import './styleDialog.scss';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Select from 'react-select';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { memo } from 'react';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';
import { createAxios } from '~/utils/createInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogEditGuardianInfo(props) {
  const { open, onOpenDialog, infoGuardian } = props;
  const genderOptions = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
  ];
  const [selectGender, setSelectGender] = React.useState();
  const handleSelectGender = (e) => {
    setSelectGender(e.value);
  };
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const EditGuardianInfo = async () => {
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
          <DialogTitle style={{ textAlign: 'center', padding: '0' }}>Thay Đổi Thông Tin Người Thân</DialogTitle>
          <hr />
          <div className="editStudentItem">
            <label>CCCD Người Thân</label>
            <input type="text" placeholder="02009300XXXX" id="CCCDGuardian" defaultValue={infoGuardian?.CCCDGuardian} />
          </div>
          <div className="editStudentItem">
            <label>Họ Tên Người Thân</label>
            <input type="text" placeholder="Nguyễn ..." id="nameGuardian" defaultValue={infoGuardian?.nameGuardian} />
          </div>
          <div className="editStudentItem">
            <label>Giới Tính Người Thân</label>
            <Select
              name="gender"
              onChange={(e) => handleSelectGender(e)}
              options={genderOptions}
              defaultValue={
                genderOptions.filter(function (option) {
                  return option.value === selectGender;
                }) || infoGuardian?.gender
              }
              placeholder={infoGuardian?.gender || '--Chọn--'}
            />
          </div>
          <div className="editStudentItem">
            <label>SĐT Người Thân</label>
            <input type="text" placeholder="0947999XXX" id="phoneGuardian" defaultValue={infoGuardian?.numberPhone} />
          </div>
          <div className="editStudentItem">
            <label>Địa Chỉ Người Thân</label>
            <input
              type="text"
              placeholder="Ghi cụ thể địa chỉ"
              id="addressGuardian"
              defaultValue={infoGuardian?.address}
            />
          </div>
          <hr></hr>
          <div className="form-button">
            <button className="btn-cancel" onClick={onOpenDialog}>
              Hủy
            </button>
            <button className="btn-edit" onClick={EditGuardianInfo}>
              Sửa
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default memo(DialogEditGuardianInfo);
