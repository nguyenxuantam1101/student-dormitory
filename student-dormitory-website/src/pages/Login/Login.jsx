import './login.scss';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '~/redux/apiRequest';
import { ToastContainer } from 'react-toastify';
import DialogForgotPass from '~/components/DialogForm/DialogForgotPass';

function Login() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const onChangePass = (e) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handleRegister = (e) => {
    navigate('/register/index');
  };
  const handleLogin = (e) => {
    e.preventDefault(); //Submit -> không load lại trang
    const user = {
      userName: userName,
      password: password,
    };
    if (userName && password) {
      loginUser(user, dispatch, navigate);
    }
  };
  const [openDialogForgotPass, setOpenDialogForgotPass] = useState(false);
  const handleOpenDialogForgotPass = () => {
    setOpenDialogForgotPass(!openDialogForgotPass);
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="options-container">
        <div className="inner">
          <div className="option-unregistered">
            <h2 className="unregistered-title">Bạn Chưa Có Tài Khoản Ký Túc Xá?</h2>
            <p className="unregistered-text">
              Bạn hãy nhấn nút Đăng Ký, sau đó hoàn thành form thông tin để đăng ký vào ở Ký Túc Xá.
            </p>
            <button className="btn-register" onClick={handleRegister}>
              Đăng Ký
            </button>
          </div>
          <div className="option-login">
            <div className="loginForm">
              <h2 className="form-title">Đăng Nhập</h2>
              <Form
                initialValues={{
                  remember: false,
                }}
                onSubmitCapture={handleLogin}
                autoComplete="off"
                className="login-form"
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tài khoản đăng nhập!',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: 'black' }} />}
                    placeholder="Nhập vào tài khoản"
                    onChange={onChangeUsername}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu đăng nhập!',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: 'black' }} />}
                    placeholder="Nhập vào mật khẩu"
                    onChange={onChangePass}
                  />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Ghi nhớ tài khoản</Checkbox>
                </Form.Item>
                <hr></hr>
                <div className="form-button">
                  <button type="submit" value="Submit" className="btn-login">
                    Đăng Nhập
                  </button>
                  <button type="button" className="btn-forgot" onClick={handleOpenDialogForgotPass}>
                    Quên Mật Khẩu?
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <DialogForgotPass open={openDialogForgotPass} onOpenDialog={handleOpenDialogForgotPass} />
        </div>
      </div>
    </div>
  );
}

export default Login;
