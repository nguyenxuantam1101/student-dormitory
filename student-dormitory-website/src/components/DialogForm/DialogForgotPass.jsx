import './styleDialog.scss';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Form, Input } from 'antd';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { memo } from 'react';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';
import { DialogContentText } from '@mui/material';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogForgotPass(props) {
  const { open, onOpenDialog } = props;
  const [CCCD, setCCCD] = React.useState();
  const [email, setEmail] = React.useState();
  const handleGetPass = async (getPass) => {
    getPass.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_API}student/forgotPassword`, {
        CCCD: CCCD,
        email: email,
      });
      showToastSuccess(res.response.data.message, 5000);
    } catch (error) {
      showToastError(error.response.data.message);
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
          <DialogTitle style={{ textAlign: 'center', padding: '0' }}>Lấy Lại Mật Khẩu</DialogTitle>
          <hr />
          <Form
            initialValues={{
              remember: false,
            }}
            autoComplete="off"
            className="get-pass-form"
            onSubmitCapture={handleGetPass}
          >
            <DialogContentText style={{ backgroundColor: '#dff0d8', color: '#3c763d', marginBottom: '15px' }}>
              Mật khẩu được gửi vào gmail sinh viên đã đăng ký trên hệ thống
            </DialogContentText>
            <Form.Item
              name="cccd"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tài khoản!',
                },
              ]}
            >
              <Input
                placeholder="Nhập vào tài khoản"
                prefix={<UserOutlined style={{ color: 'black' }} />}
                onChange={(cccd) => setCCCD(cccd.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="mail"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập gmail!',
                },
                {
                  type: 'email',
                  message: 'Vui lòng nhập đúng gmail!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: 'black' }} />}
                placeholder="Nhập vào gmail"
                onChange={(mail) => setEmail(mail.target.value)}
              />
            </Form.Item>
            <hr></hr>
            <div className="form-button">
              <button type="submit" value="Submit" className="btn-get-pass">
                Lấy Mật Khẩu
              </button>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default memo(DialogForgotPass);
