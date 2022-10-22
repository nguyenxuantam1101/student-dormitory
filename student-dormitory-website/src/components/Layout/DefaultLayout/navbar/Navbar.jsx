import './navbar.scss';
import logo from '~/assets/images/logo_KTX.png';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/utils/createInstance';
import { logOut } from '~/redux/apiRequest';
import { logoutSuccess } from '~/redux/authSlice';

function Navbar() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };
  const handleChangePass = () => {
    navigate('/edit-password');
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="" />
        </a>
        <h5 className="text-logo">TRANG THÔNG TIN SINH VIÊN Ở KÝ TÚC XÁ</h5>
      </div>
      <div className="navbar-action">
        <Tippy
          arrow="false"
          placement="bottom"
          trigger="click"
          animation="perspective"
          interactive="true"
          content={
            <div className="menu-items">
              <button className="btn-forgot" onClick={handleChangePass}>
                <PersonOutlinedIcon className="icon" />
                <span>Đổi Mật Khẩu</span>
              </button>
              <hr />
              <button className="btn-logout" onClick={handleLogout}>
                <LogoutOutlinedIcon className="icon" />
                <span>Đăng Xuất</span>
              </button>
            </div>
          }
        >
          <div className="itemAvatar">
            <img
              src={user ? user?.avatar : 'https://cdn.pixabay.com/photo/2014/04/03/10/25/reading-310397_960_720.png'}
              alt=""
              className="avatar"
            />
            <span className="nameLogin">{user?.nameStudent}</span>
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default Navbar;
