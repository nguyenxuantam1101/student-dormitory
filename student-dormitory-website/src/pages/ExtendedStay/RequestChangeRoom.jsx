import './extendedStay.scss';
import Moment from 'moment';
import Select from 'react-select';
import axios from 'axios';
import SelectRoom from './SelectRoom';
import TableTemplate from '@trendmicro/react-table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columns, rows } from '~/utils/dataTableRoomPrice';

function RequestChangeRoom(props) {
  const { infoRoom } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [floorSelect, setFloorSelect] = useState(null);
  useEffect(() => {
    (async function () {
      const genderUser = user?.gender;
      const floorOption = await axios.get(`${process.env.REACT_APP_API}building/search/gender?gender=Nam`);
      setFloorSelect(floorOption.data?.buildings);
    })();
  }, []);
  const [roomBuildingsSelect, setRoomBuildingSelect] = useState();
  const optionFloor = floorSelect?.map((option) => ({
    label: option.name,
    value: option._id,
  }));
  const [floorSelected, setFloorSelected] = useState(null);
  const handleChangeFloor = async (e) => {
    setFloorSelected(() => e.value);
    console.log(floorSelected);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}roomBuilding/room/${e.value}`);
      setRoomBuildingSelect(res.data?.roomBuildings);
    } catch (error) {
      console.log(error);
    }
  };

  // const [isClearable, setIsClearable] = useState(true);
  // const handleClear = (e) => {
  //   setFloorSelected(null);
  // };
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get(`${process.env.REACT_APP_API}roomBuilding/room/${floorSelected}`);
  //       setRoomBuildingSelect(res.data?.roomBuildings);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);
  const row = rows;
  const column = columns;

  return (
    <div className="request-change">
      <div className="student-room">
        <h4 className="title">Thông Tin Phòng Hiện Tại</h4>
        <div className="item">
          <span className="text">Phòng: </span>
          <span className="value">{infoRoom?.student?.roomBuilding?.Room?.name}</span>
        </div>
        <div className="item">
          <span className="text">Giường Số: </span>
          <span className="value">{infoRoom?.student?.roomBuilding?.Bed}</span>
        </div>
        <div className="item">
          <span className="text">Thời Gian Ở: </span>
          {infoRoom?.timeIn === 180 ? <span className="value">6 Tháng</span> : <span className="value">12 Tháng</span>}
        </div>
        <div className="item">
          <span className="text">Ngày Kết Thúc: </span>
          <span className="value">{Moment(infoRoom?.dateCheckOutRoom).format('DD-MM-YYYY')}</span>
        </div>
      </div>
      <div className="request">
        <div className="selectFloor">
          <Select
            className="select-gender"
            name="genderId"
            placeholder={user?.gender ? user?.gender : 'Giới Tính'}
            isDisabled={true}
          />
          <Select
            className="select-building"
            name="buildingId"
            onChange={handleChangeFloor}
            options={optionFloor}
            value={optionFloor?.filter(function (option) {
              return option.value === floorSelected;
            })}
            placeholder="-- Tầng --"
          />
        </div>
        {roomBuildingsSelect ? (
          <div className="bottom-tab">
            <SelectRoom roomBuildings={roomBuildingsSelect} />
          </div>
        ) : (
          <div className="bottom">
            <div className="price-table">
              <h2>Bảng Giá Các Loại Phòng</h2>
              <label>Các loại phòng ở: Tiền phòng ở (đơn vị tính: VNĐ)</label>
              <TableTemplate columns={column} data={row} width={800} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestChangeRoom;
