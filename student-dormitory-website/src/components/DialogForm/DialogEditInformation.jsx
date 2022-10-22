import './styleDialog.scss';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Form, Input } from 'antd';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { memo } from 'react';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';
import { DialogContentText } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogEditInformation(props) {
  const { open, onOpenDialog, receipt } = props;

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
          >
            <DialogContentText style={{ backgroundColor: '#dff0d8', color: '#3c763d' }}>
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
              <Input placeholder="Nhập vào tài khoản" prefix={<UserOutlined style={{ color: 'black' }} />} />
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
              <Input prefix={<MailOutlined style={{ color: 'black' }} />} placeholder="Nhập vào gmail" />
            </Form.Item>
            <hr></hr>
            <div className="form-button">
              <button type="submit" value="Submit" className="btn-get-pass">
                Sửa
              </button>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default memo(DialogEditInformation);
