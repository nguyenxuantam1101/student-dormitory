import axios from 'axios';
import Cookies from 'js-cookie';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from './authSlice';
import { getRoomBuildingFailed, getRoomBuildingStart, getRoomBuildingSuccess } from './roomBuildingSlice';
import { getRoomBuildingsFailed, getRoomBuildingsStart, getRoomBuildingsSuccess } from './roomBuildingsSlice';
import { showLoginError } from '~/utils/showToastMessage';
// import { getDetailsStudentFailed, getDetailsStudentStart, getDetailsStudentSuccess } from './studentDetailSlice';

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}student/login`, user);
    dispatch(loginSuccess(res.data));
    Cookies.set('refreshTokenStudent', res.data.refreshToken, {
      sameSite: 'strict',
      path: '/',
    });
    navigate('/');
  } catch (err) {
    showLoginError(err.response.data?.message);
    dispatch(loginFailed(err.response.data));
  }
};

// export const getDetails = async (accessToken, dispatch, axiosJWT) => {
//   dispatch(getDetailsStudentStart());
//   try {
//     const res = await axiosJWT.get(`${API}student/aStudent/`, {
//       headers: { token: `Bearer ${accessToken}` },
//     });
//     dispatch(getDetailsStudentSuccess(res.data));
//   } catch (err) {
//     dispatch(getDetailsStudentFailed());
//   }
// };

//Lấy 1 phòng
export const getRoomBuilding = async (dispatch, navigate, id, route, numberBedSelected) => {
  console.log(numberBedSelected);
  dispatch(getRoomBuildingStart());
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}roomBuilding/` + id);
    dispatch(
      getRoomBuildingSuccess({
        ...res.data,
        numberBedSelected: numberBedSelected,
      }),
    );
    navigate(route);
  } catch (error) {
    dispatch(getRoomBuildingFailed());
  }
};

//Lấy DS Phòng
export const getRoomBuildings = async (dispatch, id) => {
  dispatch(getRoomBuildingsStart());
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}roomBuilding/room/` + id);
    dispatch(getRoomBuildingsSuccess(res.data));
  } catch (error) {
    dispatch(getRoomBuildingsFailed());
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post(`${process.env.REACT_APP_API}student/logout`, id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate('/login');
  } catch (err) {
    dispatch(logoutFailed());
  }
};
