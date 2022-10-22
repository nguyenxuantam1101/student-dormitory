import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess, logoutFailed } from './authSlice';
import {
    deleteStudentsFailed,
    deleteStudentsStart,
    deleteStudentsSuccess,
    getStudentsFailed,
    getStudentsStart,
    getStudentsSuccess,
} from './studentsSlice';
import { getStaffsFailed, getStaffsStart, getStaffsSuccess } from './staffsSlice';
import { getRoomBuildingFailed, getRoomBuildingStart, getRoomBuildingSuccess } from './roomBuildingSlice';
import Cookies from 'js-cookie';
import { getDetailsStudentFailed, getDetailsStudentStart, getDetailsStudentSuccess } from './studentDetailSlice';
import { getRoomBuildingsFailed, getRoomBuildingsStart, getRoomBuildingsSuccess } from './roomBuildingsSlice';
import { getRoomDetailFailed, getRoomDetailStart, getRoomDetailSuccess } from './roomDetailSlice';

const API = 'https://nqt-server-dormitory-manager.herokuapp.com/api/v1/';

export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${API}staffDormitory/login`, user);
        dispatch(loginSuccess(res.data));
        Cookies.set('refreshTokenStaff', res.data.refreshToken, {
            sameSite: 'strict',
            path: '/',
        });
        navigate('/');
    } catch (err) {
        dispatch(loginFailed(err.response.data));
    }
};

export const getListStudent = async(accessToken, dispatch, axiosJWT) => {
    dispatch(getStudentsStart());
    try {
        const res = await axiosJWT.get(`${API}student/all-students`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        console.log(res);
        dispatch(getStudentsSuccess(res.data));
    } catch (err) {
        dispatch(getStudentsFailed());
    }
};

export const getListStaff = async(accessToken, dispatch, axiosJWT) => {
    dispatch(getStaffsStart());
    try {
        const res = await axiosJWT.get(`${API}staffDormitory`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getStaffsSuccess(res.data));
    } catch (err) {
        dispatch(getStaffsFailed());
    }
};

//chi tiết SV
export const getStudentByStaff = async(accessToken, dispatch, navigate, id, route, axiosJWT) => {
    dispatch(getDetailsStudentStart());
    try {
        const res = await axiosJWT.get(`${API}student/get-student/` + id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getDetailsStudentSuccess(res.data));
        navigate(route);
    } catch (err) {
        dispatch(getDetailsStudentFailed());
    }
};

//xóa SV
export const deleteStudent = async(accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteStudentsStart());
    try {
        const res = await axiosJWT.delete(`${API}student/` + id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteStudentsSuccess(res.data));
    } catch (err) {
        dispatch(deleteStudentsFailed(err.response.data));
    }
};

//đăng xuất
export const logOut = async(dispatch, navigator, token) => {
    dispatch(logoutStart());
    try {} catch (err) {}
};

//Lấy 1 phòng
export const getRoomBuilding = async(dispatch, navigate, id, route, numberBedSelected) => {
    console.log(numberBedSelected);
    dispatch(getRoomBuildingStart());
    try {
        const res = await axios.get(`${API}roomBuilding/` + id);
        dispatch(
            getRoomBuildingSuccess({
                ...res.data,
                numberBedSelected: numberBedSelected,
            }),
        );
        // navigate(route);
    } catch (error) {
        dispatch(getRoomBuildingFailed());
    }
};
export const getRoomBuildings = async(dispatch, id) => {
    dispatch(getRoomBuildingsStart());
    try {
        const res = await axios.get(`${API}roomBuilding/room/` + id);
        console.log(res.data);
        dispatch(getRoomBuildingsSuccess(res.data));
    } catch (error) {
        dispatch(getRoomBuildingsFailed());
    }
};
export const getRoomDetail = async(dispatch, navigate, id, route) => {
    dispatch(getRoomDetailStart());
    try {
        const res = await axios.get(`${API}roomBuilding/` + id);
        dispatch(getRoomDetailSuccess(res.data));
        navigate(route);
    } catch (err) {
        dispatch(getRoomDetailFailed());
    }
};
export const logoutUser = async(dispatch, navigate, accessToken, axiosJWT, refreshToken) => {
    dispatch(logoutStart());
    try {
        const res = await axiosJWT.post(
            `${API}staffDormitory/logout`, {
                refreshToken: refreshToken,
            }, {
                // để tránh trường hợp post nhầm token
                headers: { token: `Bearer ${accessToken}` },
            },
        );
        console.log(res);
        Cookies.remove('refreshTokenStaff ');
        dispatch(logoutSuccess());
        navigate('/admin/login');
    } catch (error) {
        dispatch(loginFailed());
    }
};