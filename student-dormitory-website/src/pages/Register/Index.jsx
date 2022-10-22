import './register.scss';
import TableTemplate from '@trendmicro/react-table';
import Select from 'react-select';
import useRoomBuildingForm from '~/components/RoomBuilding/useRoomBuildingForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import BsTabs from './Tabs/BsTabs';
import { columns, rows } from '~/utils/dataTableRoomPrice';

function Index() {
  const { state, onGenderSelect, onBuildingSelect } = useRoomBuildingForm(false);
  const { genders, buildings, roomBuildings, selectedGender, selectedBuilding, selectedRoomBuilding } = state;
  const [roomBuildingsSelected, setRoomBuildingsSelected] = useState();
  const dispatch = useDispatch();
  const roomBuilding = useSelector((state) => state.roomBuilding.roomBuilding?.roomBuilding);
  // const roomBuildingsSelected = useSelector((state) => state.roomBuildings.roomBuildings?.roomBuildings);
  useEffect(() => {
    (async () => {
      if (selectedBuilding) {
        // getRoomBuildings(dispatch, selectedBuilding.value);
        try {
          const res = await axios.get(`${process.env.REACT_APP_API}roomBuilding/room/` + selectedBuilding.value);
          setRoomBuildingsSelected(res.data.roomBuildings);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [selectedBuilding]);
  const formatNumber = (q) => {
    return q.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  const row = rows;
  const column = columns;

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h2 className="title">TRANG ĐĂNG KÝ THÔNG TIN SINH VIÊN Ở KÝ TÚC XÁ</h2>
        </div>
        <div className="center">
          <div className="newSelectRegister">
            <div className="selectRegister">
              <Select
                className="select-gender"
                name="genderId"
                key={`genderId_${selectedGender}`}
                isDisabled={genders.length === 0}
                isClearable
                options={genders}
                onChange={(option) => onGenderSelect(option)}
                placeholder="-- Giới/Tính --"
                defaultValue={selectedGender}
              />

              <Select
                className="select-building"
                isClearable
                name="buildingId"
                key={`buildingId_${selectedBuilding?.value}`}
                isDisabled={buildings.length === 0}
                options={buildings}
                onChange={(option) => onBuildingSelect(option)}
                placeholder="-- Tầng --"
                defaultValue={selectedBuilding}
              />
            </div>
          </div>
        </div>
        {roomBuildingsSelected ? (
          <div className="bottom-tab">
            <BsTabs roomBuildings={roomBuildingsSelected} roomSelected={roomBuilding} />
          </div>
        ) : (
          <div className="bottom">
            <div className="price-table">
              <h2>THÔNG TIN DÀNH CHO SINH VIÊN ĐĂNG KÝ Ở KÝ TÚC XÁ</h2>
              <label>Các loại phòng ở: Tiền phòng ở (đơn vị tính: VNĐ)</label>
              <TableTemplate columns={column} data={row} width={900} />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Index;
