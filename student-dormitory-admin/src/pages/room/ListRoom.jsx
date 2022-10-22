import './styleRoom.scss';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getRoomDetail } from '~/redux/apiRequest';

const columnsRoom = [
  {
    headerColumn: 'Tên Phòng',
  },
  {
    headerColumn: 'Tầng',
  },
  {
    headerColumn: 'Loại Phòng',
  },
  {
    headerColumn: 'Số Lượng Giường',
  },
  {
    headerColumn: 'Trạng Thái Phòng',
  },
  {
    headerColumn: 'Số sinh viên trong phòng',
  },
  {
    headerColumn: 'Tác Vụ',
  },
];

function RoomBuilding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rooms, setRoom] = useState(null);
  useEffect(() => {
    (async () => {
      if (!user) {
        navigate('/admin/login');
      }
      const res = await axios.get('https://nqt-server-dormitory-manager.herokuapp.com/api/v1/roomBuilding', {});
      setRoom(res.data?.roomBuildings);
    })();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewRoom = (navigate, dispatch, id) => {
    getRoomDetail(dispatch, navigate, id, `/admin/room/${id}`);
  };

  return (
    <div className="list-room">
      <div className="room-container">
        <div className="data-table">
          <div className="top">
            <h2 className="title" style={{ marginBottom: '10px' }}>
              Danh Sách Phòng Sinh Viên
            </h2>
          </div>
          <div className="bottom">
            {/* <div className="datatableTitle">
              <Link to="/admin/students/new" className="link">
                Thêm Mới Phòng
              </Link>
            </div> */}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer component={Paper} sx={{ minWidth: 440 }} className="table">
                <Table aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columnsRoom.map((column, index) => (
                        <TableCell key={index}>{column.headerColumn}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dataRoom) => (
                      <TableRow key={dataRoom._id}>
                        <TableCell className="tableCell">
                          <span className="value-table-cell">{dataRoom.name}</span>
                        </TableCell>
                        <TableCell className="tableCell">
                          {' '}
                          <span className="value-table-cell">{dataRoom.building.name}</span>
                        </TableCell>
                        <TableCell className="tableCell">
                          {' '}
                          <span className="value-table-cell">{dataRoom.building.floorGender}</span>
                        </TableCell>
                        <TableCell className="tableCell">
                          {' '}
                          <span className="value-table-cell">{dataRoom.name}</span>
                        </TableCell>
                        <TableCell className="tableCell">
                          <span
                            className="value-table-cell"
                            style={
                              dataRoom?.amountBed?.filter((item) => item.student == null).length === 0
                                ? { color: 'red' }
                                : {}
                            }
                          >
                            {dataRoom?.amountBed?.filter((item) => item.student == null).length === 0
                              ? 'Hết giường'
                              : 'Còn giường'}
                          </span>
                        </TableCell>
                        <TableCell className="tableCell">
                          <span className="value-table-cell">
                            {dataRoom?.amountBed?.filter((item) => item.student !== null).length +
                              '/' +
                              dataRoom?.amountBed.length}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="cellAction">
                            <div
                              className="viewButton"
                              onClick={() => handleViewRoom(navigate, dispatch, dataRoom._id)}
                            >
                              Xem
                            </div>
                            <div className="editButton">Sửa</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                className="table-pagination"
                rowsPerPageOptions={[1, 10, 25, 100]}
                component="div"
                count={rooms?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomBuilding;
