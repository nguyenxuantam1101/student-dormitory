import './extendedStay.scss';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Select from 'react-select';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/utils/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';
import { ToastContainer } from 'react-toastify';
import RequestChangeRoom from './RequestChangeRoom';
import DialogExtendStay from '~/components/DialogForm/DialogExtendStay';

function ExtendedStay() {
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const registerOptions = [
    { value: 180, label: '6 Tháng' },
    { value: 360, label: '12 Tháng' },
  ];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [extendedStay, setExtendedStay] = useState();
  const [timeIn, setTimeIn] = useState(0);
  const [infoStay, setInfoStay] = useState(null);
  const handleExtendTimeIn = (e) => {
    setTimeIn(e.value);
  };
  const [openDialogExtendStay, setOpenDialogExtendStay] = useState(false);
  const handleExtend = (e) => {
    if (timeIn === 0) {
      showToastError('Chưa Chọn Số Ngày Muốn Gia Hạn', 5000);
    } else {
      setOpenDialogExtendStay(!openDialogExtendStay);
    }
  };
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const extendedInvoice = await axiosJWT.put(
  //         `${process.env.REACT_APP_API}student/extendDayStay`,
  //         { timeIn: extendedStay },
  //         {
  //           headers: { token: `Bearer ${user?.accessToken}` },
  //         },
  //       );
  //     } catch (error) {
  //       showToastError(error.response.data.message, 5000);
  //     }
  //   })();
  // }, []);
  useEffect(() => {
    (async function () {
      try {
        const id = user?.registrationAtDormitory;
        const infoStayOfStudent = await axiosJWT.get(
          `${process.env.REACT_APP_API}registrationAtDormitory/registration/${id}`,
        );
        setInfoStay(infoStayOfStudent.data);
      } catch (error) {
        showToastError(error.response.data.message, 5000);
      }
    })();
  }, []);

  let date = new Date();
  let dateLate = new Date((date.getTime() - Date.parse(infoStay?.dateCheckOutRoom)) * -1).getDate();
  let dateExpiration = new Date(date.getTime() - Date.parse(infoStay?.dateCheckOutRoom)).getDate();

  return (
    <div className="detail">
      <ToastContainer />
      <div className="detailContainer">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="GIA HẠN THUÊ PHÒNG" value="1" />
                <Tab label="YÊU CẦU ĐỔI PHÒNG" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {Date.parse(infoStay?.dateCheckOutRoom) - date.getTime() <= 15 * 24 * 3600000 ? (
                <h6 className="mess-extend">(*)Chưa Đến Thời Gian Gia Hạn</h6>
              ) : (
                <div>
                  {date.getTime() <= Date.parse(infoStay?.dateCheckOutRoom) ? (
                    <h6 className="mess-extend">Thời Gian Gia Hạn Ở KTX Hết Hạn Sau: {dateExpiration} Ngày</h6>
                  ) : (
                    <h6 className="mess-extend">Thời Gian Gia Hạn Ở KTX Trễ: {dateLate} Ngày</h6>
                  )}
                </div>
              )}
              <div
                className={
                  date.getTime() <= Date.parse(infoStay?.dateCheckOutRoom) ? 'card-extended' : 'card-extended disabled'
                }
              >
                <div className="item">
                  <span className="title">Tên Phòng:</span>
                  <span className="value">{infoStay?.student?.roomBuilding?.Room?.name}</span>
                </div>
                <div className="item">
                  <span className="title">Giường Số:</span>
                  <span className="value">{infoStay?.student?.roomBuilding?.Bed}</span>
                </div>
                <div className="item">
                  <span className="title">Gia Hạn Thêm:</span>
                  <Select
                    name="registerOption"
                    onChange={handleExtendTimeIn}
                    options={registerOptions}
                    value={registerOptions?.filter(function (option) {
                      return option.value === timeIn;
                    })}
                    placeholder="--Chọn--"
                  />
                </div>
                <div className="action-btn">
                  <div>
                    <button className="btn-extended" onClick={handleExtend}>
                      Gia Hạn
                    </button>
                  </div>
                </div>
              </div>
            </TabPanel>
            <DialogExtendStay
              open={openDialogExtendStay}
              onOpenDialog={handleExtend}
              timeIn={timeIn}
              registration={infoStay}
            />
            <TabPanel value="2">
              <RequestChangeRoom infoRoom={infoStay} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default ExtendedStay;
