import './information.scss';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/utils/createInstance';
import { loginSuccess } from '~/redux/authSlice';
// import DialogEditInformation from '~/components/DialogForm/DialogEditInformation';
import DialogEditContactInfo from '~/components/DialogForm/DialogEditContactInfo';
import DialogEditGuardianInfo from '~/components/DialogForm/DialogEditGuardianInfo';

function Information() {
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [detailsStudent, setDetailsStudent] = useState(null);
  useEffect(() => {
    (async () => {
      if (!user) {
        navigate('/login');
      }
      const res = await axiosJWT.get(`${process.env.REACT_APP_API}student/aStudent`, {
        headers: { token: `Bearer ${user?.accessToken}` },
      });
      setDetailsStudent(res.data?.student);
    })();
  }, []);
  const dataGuardian = detailsStudent?.guardianOfStudent.map((guardian) => ({
    CCCDGuardian: guardian.CCCDGuardian,
    nameGuardian: guardian.nameGuardian,
    numberPhone: guardian.numberPhone,
    id: guardian._id,
  }));
  // const handleCheck = (e) => {
  //   console.log('tab 2 ne');
  // };
  // const [openDialogEditInfo, setOpenDialogEditInfo] = useState(false);
  // const handleEditInfo = () => {
  //   setOpenDialogEditInfo(!openDialogEditInfo);
  // };
  const [openDialogEditContactInfo, setOpenDialogEditContactInfo] = useState(false);
  const handleEditContactInfo = () => {
    setOpenDialogEditContactInfo(!openDialogEditContactInfo);
  };
  const [openDialogEditGuardianInfo, setOpenDialogEditGuardianInfo] = useState(false);
  const handleEditGuardianInfo = () => {
    setOpenDialogEditGuardianInfo(!openDialogEditGuardianInfo);
  };

  return (
    <div className="detail">
      <div className="detailContainer">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="THÔNG TIN CHUNG" value="1" />
                <Tab label="THÔNG TIN LIÊN HỆ" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="information">
                <div className="left-1">
                  <div>
                    <img
                      className="avatar"
                      src={
                        user
                          ? detailsStudent?.avatar
                          : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                      }
                      alt=""
                    />
                  </div>
                  <div className="img-cccd">
                    <div>
                      <label className="label-image">CCCD Mặt Trước</label>
                      <div>
                        <img
                          className="frontImageIdentity"
                          src={
                            user
                              ? detailsStudent?.frontImageIdentity
                              : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-image">CCCD Mặt Sau</label>
                      <div>
                        <img
                          className="backImageIdentity"
                          src={
                            user
                              ? detailsStudent?.backImageIdentity
                              : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-1">
                  <h2 className="detail-title">Thông Tin Sinh Viên</h2>
                  <div className="card">
                    <div className="content-right">
                      <div className="detailItem">
                        <span className="itemKey">Họ Và Tên:</span>
                        <span className="itemValue">{detailsStudent?.nameStudent}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Ngày Sinh:</span>
                        <span className="itemValue">{Moment(detailsStudent?.birthDay).format('DD-MM-YYYY')}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Giới Tính:</span>
                        <span className="itemValue">{detailsStudent?.gender}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">CCCD:</span>
                        <span className="itemValue">{detailsStudent?.CCCD}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Mã Số Sinh Viên:</span>
                        <span className="itemValue">{detailsStudent?.idStudent}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Sinh Viên Năm:</span>
                        <span className="itemValue">{detailsStudent?.yearStudent}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Phòng:</span>
                        <span className="itemValue">{detailsStudent?.roomBuilding?.Room?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="request-edit">
                    <span>Yêu cầu chỉnh sửa các thông tin xin liên hệ:</span>
                    <ul>
                      <li>
                        SĐT: <strong>0941.882.xxx</strong>
                      </li>
                      <li>
                        Email: <strong>banquanlyktx@gmail.com</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="contact-info">
                <div className="left-2">
                  <h2 className="detail-title">Thông Tin Cư Trú, Liên Hệ</h2>
                  <div className="card">
                    <div className="editButton" onClick={handleEditContactInfo}>
                      Sửa
                    </div>
                    <div className="content-right">
                      <div className="detailItem">
                        <span className="itemKey">Tỉnh/Thành:</span>
                        <span className="itemValue">{detailsStudent?.province}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Quận/Huyện:</span>
                        <span className="itemValue">{detailsStudent?.district}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Xã/Phường:</span>
                        <span className="itemValue">{detailsStudent?.wards}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Địa Chỉ:</span>
                        <span className="itemValue">{detailsStudent?.address}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Email:</span>
                        <span className="itemValue">{detailsStudent?.email}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Số Điện Thoại:</span>
                        <span className="itemValue">{detailsStudent?.numberPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-2">
                  <h2 className="detail-title">Thông Tin Thân Nhân</h2>
                  {dataGuardian?.map((data) => {
                    return (
                      <div className="card" key={data.id}>
                        <div className="editButton" onClick={handleEditGuardianInfo}>
                          Sửa
                        </div>
                        <div className="content-right">
                          <div className="detailItem">
                            <span className="itemKey">Họ Tên Thân Nhân:</span>
                            <span className="itemValue">{data.nameGuardian}</span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">CCCD Thân Nhân:</span>
                            <span className="itemValue">{data.CCCDGuardian}</span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Giới Tính:</span>
                            <span className="itemValue">{data.gender}</span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Số Điện Thoại:</span>
                            <span className="itemValue">{data.numberPhone}</span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Địa Chỉ:</span>
                            <span className="itemValue">{data.address}</span>
                          </div>
                        </div>
                        <DialogEditGuardianInfo
                          open={openDialogEditGuardianInfo}
                          onOpenDialog={handleEditGuardianInfo}
                          infoGuardian={data}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      <DialogEditContactInfo
        open={openDialogEditContactInfo}
        onOpenDialog={handleEditContactInfo}
        infoContact={detailsStudent}
      />
    </div>
  );
}

export default Information;
