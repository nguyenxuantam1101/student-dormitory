import './edit.scss';
import 'antd/dist/antd.css';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createAxios } from '~/utils/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';
import { ToastContainer } from 'react-toastify';

function EditPassWord() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [newPassRepeat, setNewPassRepeat] = useState();
  const handleChangePassword = async (changePass) => {
    changePass.preventDefault();
    try {
      const res = await axiosJWT.put(
        `${process.env.REACT_APP_API}student/changePassword`,
        { userName: user.CCCD, oldPassword: oldPass, passwordUser: newPass, repeatPassword: newPassRepeat },
        {
          headers: { token: `Bearer ${user?.accessToken}` },
        },
      );
      showToastSuccess('Đổi Mật Khẩu Thành Công', 5000);
    } catch (error) {
      showToastError(error.response.data.message, 5000);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="card-edit">
        <div className="titleEdit">
          Thay Đổi Mật Khẩu
          <hr />
        </div>
        <div className="change-pass">
          <Form onSubmitCapture={handleChangePassword}>
            <div className="change-pass-items">
              <label>Mật Khẩu Cũ:</label>
              <Form.Item
                name="old-pass"
                rules={[
                  {
                    required: true,
                    message: 'Cần phải có mật khẩu cũ!',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Nhập vào mật khẩu cũ"
                  onChange={(oldPass) => setOldPass(oldPass.target.value)}
                />
              </Form.Item>
            </div>
            <div className="change-pass-items">
              <label>Mật Khẩu Mới:</label>
              <Form.Item
                name="new-pass"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu mới!',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Nhập vào mật khẩu mới"
                  onChange={(newPass) => setNewPass(newPass.target.value)}
                />
              </Form.Item>
            </div>
            <div className="change-pass-items">
              <label>Nhập Lại Mật Khẩu Mới:</label>
              <Form.Item
                name="confirm-password"
                dependencies={['new-pass']}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('new-pass') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Nhập lại mật khẩu mới"
                  onChange={(newPassRepeat) => setNewPassRepeat(newPassRepeat.target.value)}
                />
              </Form.Item>
            </div>
            <div className="change-pass-items">
              <button type="submit" value="Submit">
                Thay Đổi Mật Khẩu
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditPassWord;
