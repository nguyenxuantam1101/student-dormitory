// import './allRegistrationFormStudentStyle.css';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getRoomDetail } from '~/redux/apiRequest';
import Moment from 'moment';
import AllRegistrationForm from '../registrationFormStudent/allRegistrationFormsStudent';
import './registrationStyle.css';

const API = 'https://nqt-server-dormitory-manager.herokuapp.com/api/v1/';

function ListRegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState('confirming');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  const handleViewRegistration = (id) => {
    navigate(`/admin/registration-form-student/${id}`);
  };

  return (
    <div className="list-room">
      <div className="room-container">
        <div className="data-table">
          <div className="top">
            <h2 className="title">Phiếu đăng ký</h2>
          </div>
          <div className="bottom">
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={status || value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab label="TẤT CẢ PHIẾU ĐĂNG KÝ" value="all" />
                    <Tab label="ĐANG CHỜ XÁC NHẬN" value="confirming" />
                    <Tab label="KHÔNG XÁC NHẬN" value="denied" />
                    <Tab label="ĐÃ XÁC NHẬN" value="confirmed" />
                    <Tab label="XẮP HẾT HẠN" value="almostExpired" />
                    <Tab label="QUÁ HẠN" value="expired" />
                    <Tab label="ĐÃ XÓA" value="deleted" />
                  </TabList>
                </Box>
                <TabPanel value="all">
                  <AllRegistrationForm statusRegistrations={status || value} />
                </TabPanel>
                <TabPanel value="confirming">
                  {' '}
                  <AllRegistrationForm statusRegistrations={status || value} />
                </TabPanel>
                <TabPanel value="denied">
                  {' '}
                  <AllRegistrationForm statusRegistrations={status || value} />
                </TabPanel>
                <TabPanel value="confirmed">
                  {' '}
                  <AllRegistrationForm statusRegistrations={status || value} />
                </TabPanel>
                <TabPanel value="almostExpired">
                  {' '}
                  <AllRegistrationForm statusRegistrations={status || value} />
                </TabPanel>
                <TabPanel value="expired">
                  {' '}
                  <AllRegistrationForm statusRegistrations={status || value} />
                </TabPanel>
                <TabPanel value="deleted">
                  {' '}
                  <AllRegistrationForm statusRegistrations={status || value} />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListRegistrationForm;
