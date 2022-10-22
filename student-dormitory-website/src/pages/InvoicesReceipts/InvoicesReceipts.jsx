import './invoicesReceipts.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { createAxios } from '~/utils/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import Receipts from './Receipts';
import Invoices from './Invoices';
import Violation from './Violation';
import DetailHistoryReceipts from './DetailHistoryReceipts';
import { ToastContainer } from 'react-toastify';
import { showToastSuccess, showToastError } from '~/utils/showToastMessage';

const columnsHisReceipts = [
  {
    headerColumn: 'Tháng/Năm',
  },
  {
    headerColumn: 'Ngày Chốt Chỉ Số',
  },
  {
    headerColumn: 'Tổng Tiền',
  },
  {
    headerColumn: 'Người Tạo',
  },
  {
    headerColumn: 'Trạng Thái',
  },
  {
    headerColumn: 'Ghi Chú',
  },
  {},
];

const columnsHisViolations = [
  {
    headerColumn: 'Tháng/Năm',
  },
  {
    headerColumn: 'Ngày Lập Biên Bản',
  },
  {
    headerColumn: 'Tổng Tiền',
  },
  {
    headerColumn: 'Người Tạo',
  },
  {
    headerColumn: 'Trạng Thái',
  },
  {},
];

const columnsHisInvoices = [
  {
    headerColumn: 'Phòng',
  },
  {
    headerColumn: 'Thời Gian Ở',
  },
  {
    headerColumn: 'Tổng Tiền',
  },
  {
    headerColumn: 'Ngày Lập',
  },
  {
    headerColumn: 'Hạn Cuối',
  },
  {
    headerColumn: 'Trạng Thái',
  },
  {
    headerColumn: 'Người Tạo',
  },
  {},
];

function InvoicesReceipts() {
  const formatNumber = (q) => {
    return q.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const roomId = user?.roomBuilding?.Room;
  const idStudent = user?._id;
  const [receipts, setReceipts] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const billCostOfLivings = await axiosJWT.get(
          `${process.env.REACT_APP_API}billCostOfLiving/roomFollow/${roomId}?page=1&limit=1`,
          {
            headers: { token: `Bearer ${user?.accessToken}` },
          },
        );
        setReceipts(billCostOfLivings.data?.billCostOfLivings);
      } catch (error) {
        showToastError(error.response.data.message);
      }
    })();
  }, []);
  const [listReceipt, setListReceipt] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const listReceipt = await axiosJWT.get(
          `${process.env.REACT_APP_API}billCostOfLiving/roomFollow/${roomId}?page=1&limit=0`,
          {
            headers: { token: `Bearer ${user?.accessToken}` },
          },
        );
        setListReceipt(listReceipt.data?.billCostOfLivings);
      } catch (error) {
        showToastError(error.response.data.message);
      }
    })();
  }, []);
  const [feeInvoices, setFeeInvoices] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const feeInvoicesData = await axiosJWT.get(
          `${process.env.REACT_APP_API}feeInvoice/student/${idStudent}?page=1&limit=1`,
          {
            headers: { token: `Bearer ${user?.accessToken}` },
          },
        );
        setFeeInvoices(feeInvoicesData.data?.feeInvoices);
      } catch (error) {
        showToastError(error.response.data.message);
      }
    })();
  }, []);
  const [listFeeInvoices, setListFeeInvoices] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const feeInvoicesData = await axiosJWT.get(
          `${process.env.REACT_APP_API}feeInvoice/student/${idStudent}?page=1&limit=0`,
          {
            headers: { token: `Bearer ${user?.accessToken}` },
          },
        );
        setListFeeInvoices(feeInvoicesData.data?.feeInvoices);
      } catch (error) {
        showToastError(error.response.data.message);
      }
    })();
  }, []);
  console.log(listFeeInvoices);
  const [openDialogDetailRec, setOpenDialogDetailRec] = useState(false);
  const [hisReceipts, setHisReceipts] = useState(null);
  const viewDetailsReceipt = (receipts) => {
    setHisReceipts(receipts);
    setOpenDialogDetailRec(!openDialogDetailRec);
  };

  const [violation, setViolation] = useState();
  useEffect(() => {
    (async function () {
      try {
        const res = await axiosJWT.get(
          `${process.env.REACT_APP_API}violationRecord/violation/student/${idStudent}?page=1&limit=1`,
          {
            headers: { token: `Bearer ${user?.accessToken}` },
          },
        );
        setViolation(res.data?.violationRecords);
      } catch (error) {
        showToastError(error.response.data.message);
      }
    })();
  }, []);
  const [listViolation, setListViolation] = useState();
  useEffect(() => {
    (async function () {
      try {
        const listReceipt = await axiosJWT.get(
          `${process.env.REACT_APP_API}violationRecord/violation/student/${idStudent}?page=1&limit=0`,
          {
            headers: { token: `Bearer ${user?.accessToken}` },
          },
        );
        setListViolation(listReceipt.data?.violationRecords);
      } catch (error) {
        showToastError(error.response.data.message);
      }
    })();
  }, []);
  console.log(violation);

  return (
    <div className="detail">
      <ToastContainer />
      <div className="detailContainer">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="BIÊN LAI ĐIỆN/NƯỚC" value="1" />
                <Tab label="HÓA ĐƠN LỆ PHÍ" value="2" />
                <Tab label="PHIẾU PHẠT VI PHẠM" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="receipts">
                {receipts && receipts.length > 0 ? (
                  receipts.map((billCostOfLiving) => {
                    return (
                      <div key={billCostOfLiving._id}>
                        <h2 className="receipts-title">
                          Biên Lai Điện - Nước Tháng {Moment(billCostOfLiving?.createdAt).format('MM/YYYY')}
                        </h2>
                        <Receipts receiptOfRoom={billCostOfLiving} />
                      </div>
                    );
                  })
                ) : (
                  <div className="empty-msg">
                    <h6 className="message">Đang cập nhật...</h6>
                  </div>
                )}
              </div>
              <div className="list-receipt">
                {receipts?.map((hisReceipts) => {
                  return (
                    <div key={hisReceipts._id}>
                      <h2 className="receipts-title">Lịch Sử Hóa Đơn Điện - Nước {hisReceipts?.Room?.name} </h2>
                      <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead style={{ backgroundColor: 'gray' }}>
                            <TableRow>
                              {columnsHisReceipts.map((column, index) => (
                                <TableCell style={{ color: 'white' }} key={index}>
                                  {column.headerColumn}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listReceipt && listReceipt.length > 0 ? (
                              listReceipt?.map((hisReceipts) => {
                                return (
                                  <TableRow key={hisReceipts._id}>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {Moment(hisReceipts?.createdAt).format('MM/YYYY')}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {Moment(hisReceipts?.createdAt).format('DD-MM-YYYY')}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {formatNumber(hisReceipts?.totalPayment)}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">{hisReceipts?.staffCreate?.nameStaff}</span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      {hisReceipts?.statusBill === true ? (
                                        <span className="paid" style={{ color: 'green' }}>
                                          Đã thanh toán
                                        </span>
                                      ) : (
                                        <span className="un-paid" style={{ color: 'red' }}>
                                          Chưa thanh toán
                                        </span>
                                      )}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {hisReceipts?.notePayment === null ? 'Không Có' : hisReceipts?.notePayment}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <Tippy placement="bottom" arrow={false} content="Chi Tiết">
                                        <VisibilityIcon
                                          style={{
                                            padding: '5px',
                                            cursor: 'pointer',
                                            backgroundColor: '#3c8dbc',
                                            color: 'white',
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '5px',
                                          }}
                                          onClick={() => viewDetailsReceipt(hisReceipts)}
                                        />
                                      </Tippy>
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <div className="empty-msg">
                                <h6 className="message">Đang cập nhật...</h6>
                              </div>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="invoices">
                <h2 className="invoices-title">Hóa Đơn Lệ Phí</h2>
                {feeInvoices && feeInvoices.length > 0 ? (
                  feeInvoices.map((feeInvoice) => <Invoices key={feeInvoice._id} feeInvoice={feeInvoice} />)
                ) : (
                  <div className="empty-msg">
                    <h6 className="message">Đang cập nhật...</h6>
                  </div>
                )}
              </div>
              <div className="list-receipt">
                {feeInvoices?.map((historyFeeInvoices) => {
                  return (
                    <div key={historyFeeInvoices._id}>
                      <h2 className="receipts-title">
                        Lịch Sử Hóa Đơn Lệ Phí Của {historyFeeInvoices?.student?.nameStudent}
                      </h2>
                      <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead style={{ backgroundColor: 'gray' }}>
                            <TableRow>
                              {columnsHisInvoices.map((column, index) => (
                                <TableCell style={{ color: 'white' }} key={index}>
                                  {column.headerColumn}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listFeeInvoices && listFeeInvoices.length > 0 ? (
                              listFeeInvoices?.map((hisFeeInvoices) => {
                                return (
                                  <TableRow key={hisFeeInvoices._id}>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">{hisFeeInvoices?.roomBuilding?.name}</span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {hisFeeInvoices?.student?.registrationAtDormitory?.timeIn &&
                                          hisFeeInvoices?.student?.registrationAtDormitory?.timeIn / 30}
                                        {' (Tháng)'}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {hisFeeInvoices?.totalPrice && formatNumber(hisFeeInvoices?.totalPrice)}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {Moment(hisFeeInvoices?.createdAt).format('DD/MM/YYYY')}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {Moment(hisFeeInvoices?.dateLine).format('DD/MM/YYYY')}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      {hisFeeInvoices?.statusInvoice === true ? (
                                        <span className="paid" style={{ color: 'green' }}>
                                          Đã thanh toán
                                        </span>
                                      ) : (
                                        <span className="un-paid" style={{ color: 'red' }}>
                                          Chưa thanh toán
                                        </span>
                                      )}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">{hisFeeInvoices?.staffCreate?.nameStaff}</span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <Tippy placement="bottom" arrow={false} content="Chi Tiết">
                                        <VisibilityIcon
                                          style={{
                                            padding: '5px',
                                            cursor: 'pointer',
                                            backgroundColor: '#3c8dbc',
                                            color: 'white',
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '5px',
                                          }}
                                        />
                                      </Tippy>
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <div className="empty-msg">
                                <h6 className="message">Đang cập nhật...</h6>
                              </div>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div className="violations">
                <h2 className="violations-title">Phiếu Phạt Vi Phạm</h2>
                {violation && violation.length > 0 ? (
                  violation.map((violation) => <Violation key={violation._id} violation={violation} />)
                ) : (
                  <div className="empty-msg">
                    <h6 className="message">Đang cập nhật...</h6>
                  </div>
                )}
              </div>
              <div className="list-receipt">
                {violation?.map((historyViolations) => {
                  return (
                    <div key={historyViolations._id}>
                      <h2 className="receipts-title">Lịch Sử Vi Phạm Của {historyViolations?.student?.nameStudent} </h2>
                      <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead style={{ backgroundColor: 'gray' }}>
                            <TableRow>
                              {columnsHisViolations.map((column, index) => (
                                <TableCell style={{ color: 'white' }} key={index}>
                                  {column.headerColumn}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listViolation && listViolation.length > 0 ? (
                              listViolation?.map((hisViolations) => {
                                return (
                                  <TableRow key={hisViolations._id}>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {Moment(hisViolations?.createdAt).format('MM/YYYY')}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {Moment(hisViolations?.createdAt).format('DD-MM-YYYY')}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">
                                        {hisViolations?.totalViolationRecord &&
                                          formatNumber(hisViolations?.totalViolationRecord)}
                                      </span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <span className="value-table-cell">{hisViolations?.staffCreate?.nameStaff}</span>
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      {hisViolations?.statusBill === true ? (
                                        <span className="paid" style={{ color: 'green' }}>
                                          Đã thanh toán
                                        </span>
                                      ) : (
                                        <span className="un-paid" style={{ color: 'red' }}>
                                          Chưa thanh toán
                                        </span>
                                      )}
                                    </TableCell>
                                    <TableCell className="tableCell">
                                      <Tippy placement="bottom" arrow={false} content="Chi Tiết">
                                        <VisibilityIcon
                                          style={{
                                            padding: '5px',
                                            cursor: 'pointer',
                                            backgroundColor: '#3c8dbc',
                                            color: 'white',
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '5px',
                                          }}
                                        />
                                      </Tippy>
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <div className="empty-msg">
                                <h6 className="message">Đang cập nhật...</h6>
                              </div>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
        {openDialogDetailRec && (
          <DetailHistoryReceipts
            open={openDialogDetailRec}
            onOpenDialog={viewDetailsReceipt}
            detailReceipts={hisReceipts}
          />
        )}
      </div>
    </div>
  );
}

export default InvoicesReceipts;
