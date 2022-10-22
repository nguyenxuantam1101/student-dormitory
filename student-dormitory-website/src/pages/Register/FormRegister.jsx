import './register.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import useLocationForm from '~/components/Province/useLocationForm';
import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';
import { ToastContainer } from 'react-toastify';
import { Form, Input, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

function FormRegister() {
  const navigate = useNavigate();
  const roomSelected = useSelector((state) => state.roomBuilding.roomBuilding?.roomBuilding);
  const bedSelected = useSelector((state) => state.roomBuilding?.numberBedSelected);
  const yearOptions = [
    { value: 1, label: 'Năm 1' },
    { value: 2, label: 'Năm 2' },
    { value: 3, label: 'Năm 3' },
    { value: 4, label: 'Năm 4' },
    { value: 5, label: 'Năm 5' },
  ];
  const [selectYear, setSelectYear] = useState();
  const handleSelectYear = (e) => {
    setSelectYear(e.value);
  };
  const registerOptions = [
    { value: 180, label: '6 Tháng' },
    { value: 360, label: '12 Tháng' },
  ];
  const [selectRegister, setSelectRegister] = useState();
  const handleSelectRegister = (e) => {
    setSelectRegister(e.value);
  };
  const genderOptions = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
  ];
  const [selectGender, setSelectGender] = useState();
  const handleSelectGender = (e) => {
    setSelectGender(e.value);
  };
  const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);
  const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;
  var formData = new FormData();
  const [avatar, setAvatar] = useState();
  const [frontImageIdentity, setFrontImageIdentity] = useState();
  const [backImageIdentity, setBackImageIdentity] = useState();
  const [data, setData] = useState({
    CCCD: '',
    idStudent: '',
    nameStudent: '',
    numberPhone: '',
    email: '',
    address: '',
    birthDay: '',
  });
  const url = `${process.env.REACT_APP_API}student/create`;
  const AddDataStudent = async (e) => {
    e.preventDefault();
    formData.append('CCCD', data.CCCD);
    formData.append('idStudent', data.idStudent);
    formData.append('nameStudent', data.nameStudent);
    formData.append('birthday', data.birthDay);
    formData.append('numberPhone', data.numberPhone);
    formData.append('email', data.email);
    formData.append('yearStudent', selectYear);
    formData.append('address', data.address);
    formData.append('province', state.selectedCity?.label);
    formData.append('district', state.selectedDistrict?.label);
    formData.append('wards', state.selectedWard?.label);
    formData.append('gender', roomSelected.building.floorGender);
    formData.append('room', roomSelected._id);
    formData.append('numberBed', bedSelected);
    formData.append('timeIn', selectRegister);
    formData.append('CCCDGuardian', data.CCCDGuardian);
    formData.append('nameGuardian', data.nameGuardian);
    formData.append('avatar', avatar);
    formData.append('frontImageIdentity', frontImageIdentity);
    formData.append('backImageIdentity', backImageIdentity);
    try {
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showToastSuccess(res?.data.message, 3000);
      window.location.assign('https://mail.google.com/');
    } catch (error) {
      showToastError(error.response.data.message, 3000);
    }
  };
  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  return (
    <div className="new">
      <div className="newContainer">
        <ToastContainer />
        <div className="top">
          <h2 className="title">
            Thông Tin Đăng Ký: {roomSelected.building.name} - {roomSelected.building.floorGender} - {roomSelected.name}{' '}
            - Giường {bedSelected}
          </h2>
        </div>
        <Form encType="multipart/form-data" onSubmitCapture={AddDataStudent}>
          <div className="bottom">
            <div className="input-img">
              <div className="left">
                <label className="label-image">Hình 4x6</label>
                <div>
                  <img
                    className="avatar"
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                    }
                    alt=""
                    id="avatar"
                  />
                  <div className="formInput">
                    <label htmlFor="file">
                      Tải lên: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <Form.Item
                      name="file"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng thêm hình!',
                        },
                      ]}
                    >
                      <Input
                        type="file"
                        id="file"
                        value={data.avatar}
                        onChange={(e) => setAvatar(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="form-right">
                  <div>
                    <label className="label-image">CCCD Mặt Trước</label>
                    <div>
                      <img
                        className="frontImageIdentity"
                        src={
                          frontImageIdentity
                            ? URL.createObjectURL(frontImageIdentity)
                            : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                        }
                        alt=""
                        id="imageFrontImageIdentity"
                      />
                      <div className="formInput">
                        <label htmlFor="frontImageIdentity">
                          Tải lên: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <Form.Item
                          name="frontImageIdentity"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng thêm hình!',
                            },
                          ]}
                        >
                          <Input
                            type="file"
                            id="frontImageIdentity"
                            value={data.frontImageIdentity}
                            onChange={(e) => setFrontImageIdentity(e.target.files[0])}
                            style={{ display: 'none' }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="label-image">CCCD Mặt Sau</label>
                    <div>
                      <img
                        className="backImageIdentity"
                        src={
                          backImageIdentity
                            ? URL.createObjectURL(backImageIdentity)
                            : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                        }
                        alt=""
                        id="imageBackImageIdentity"
                      />
                      <div className="formInput">
                        <label htmlFor="backImageIdentity" className="">
                          Tải lên: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <Form.Item
                          name="backImageIdentity"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng thêm hình!',
                            },
                          ]}
                        >
                          <Input
                            type="file"
                            id="backImageIdentity"
                            value={data.backImageIdentity}
                            onChange={(e) => setBackImageIdentity(e.target.files[0])}
                            style={{ display: 'none' }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="input-info">
              <div className="input-left">
                <div className="newStudentForm">
                  <div className="newStudentItem">
                    <label>CCCD</label>
                    <Form.Item
                      name="cccd"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập CCCD!',
                        },
                      ]}
                    >
                      <Input onChange={handle} type="text" placeholder="02009300XXXX" id="CCCD" value={data.CCCD} />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>MSSV</label>
                    <Form.Item
                      name="mssv"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập MSSV!',
                        },
                      ]}
                    >
                      <Input
                        onChange={handle}
                        type="text"
                        placeholder="191106XXXX"
                        id="idStudent"
                        value={data.idStudent}
                      />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>Họ Và Tên</label>
                    <Form.Item
                      name="fullname"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập họ và tên!',
                        },
                      ]}
                    >
                      <Input
                        onChange={handle}
                        type="text"
                        placeholder="Nguyễn Xuân A"
                        id="nameStudent"
                        value={data.nameStudent}
                      />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>Ngày Tháng Năm Sinh</label>
                    <Form.Item
                      name="birthday"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn ngày tháng năm sinh!',
                        },
                      ]}
                    >
                      <Input
                        onChange={handle}
                        type="date"
                        placeholder="dd-mm-yyyy"
                        id="birthDay"
                        value={data.birthDay}
                      />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>Số Điện Thoại</label>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số điện thoại!',
                        },
                      ]}
                    >
                      <Input
                        onChange={handle}
                        type="text"
                        placeholder="0947999XXX"
                        id="numberPhone"
                        value={data.numberPhone}
                      />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>Gmail</label>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập gmail!',
                        },
                        {
                          type: 'email',
                          message: 'Vui lòng nhập đúng gmail!',
                        },
                      ]}
                    >
                      <Input onChange={handle} placeholder="nguyenxuana@gmail.com" id="email" value={data.email} />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>Sinh Viên Năm</label>
                    <Form.Item
                      name="yearStudent"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn năm!',
                        },
                      ]}
                    >
                      <Select
                        name="yearStudent"
                        isClearable
                        onChange={handleSelectYear}
                        options={yearOptions}
                        value={yearOptions.filter(function (option) {
                          return option.value === selectYear;
                        })}
                        placeholder="--Chọn--"
                      />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>Đăng Ký Ở</label>
                    <Form.Item
                      name="registerOption"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn số tháng đăng ký ở!',
                        },
                      ]}
                    >
                      <Select
                        name="registerOption"
                        isClearable
                        onChange={handleSelectRegister}
                        options={registerOptions}
                        value={registerOptions.filter(function (option) {
                          return option.value === selectRegister;
                        })}
                        placeholder="--Chọn--"
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="input-right">
                <div className="newStudentForm">
                  <div className="newStudentItem">
                    <label>Địa Chỉ Thường Trú</label>
                    <Form.Item
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập địa chỉ!',
                        },
                      ]}
                    >
                      <Input
                        onChange={handle}
                        type="text"
                        placeholder="01 Trần Hưng Đạo"
                        id="address"
                        value={data.address}
                      />
                    </Form.Item>
                    <label>Tỉnh/Thành</label>
                    <Form.Item
                      name="cityId"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn tỉnh-thành!',
                        },
                      ]}
                    >
                      <Select
                        name="cityId"
                        isDisabled={cityOptions.length === 0}
                        options={cityOptions}
                        onChange={(option) => onCitySelect(option)}
                        placeholder="--Tỉnh/Thành--"
                        defaultValue={selectedCity}
                      />
                    </Form.Item>
                    <label>Quận/Huyện</label>
                    <Form.Item
                      name="districtId"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn quận-huyện!',
                        },
                      ]}
                    >
                      <Select
                        name="districtId"
                        isDisabled={districtOptions.length === 0}
                        options={districtOptions}
                        onChange={(option) => onDistrictSelect(option)}
                        placeholder="--Quận/Huyện--"
                        defaultValue={selectedDistrict}
                      />
                    </Form.Item>
                    <label>Phường/Xã</label>
                    <Form.Item
                      name="wardId"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn phường-xã!',
                        },
                      ]}
                    >
                      <Select
                        name="wardId"
                        isDisabled={wardOptions.length === 0}
                        options={wardOptions}
                        placeholder="--Phường/Xã--"
                        onChange={(option) => onWardSelect(option)}
                        defaultValue={selectedWard}
                      />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>CCCD Người Thân</label>
                    <Form.Item
                      name="CCCDGuardian"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập CCCD người thân!',
                        },
                      ]}
                    >
                      <Input
                        onChange={handle}
                        type="text"
                        placeholder="02009300XXXX"
                        id="CCCDGuardian"
                        value={data.CCCDGuardian}
                      />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>Họ Tên Người Thân</label>
                    <Form.Item
                      name="nameGuardian"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập họ tên người thân!',
                        },
                      ]}
                    >
                      <Input
                        onChange={handle}
                        type="text"
                        placeholder="Nguyễn ..."
                        id="nameGuardian"
                        value={data.nameGuardian}
                      />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>Giới Tính Người Thân</label>
                    <Form.Item
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn giới tính!',
                        },
                      ]}
                    >
                      <Select
                        name="gender"
                        onChange={handleSelectGender}
                        options={genderOptions}
                        value={genderOptions.filter(function (option) {
                          return option.value === selectGender;
                        })}
                        placeholder="--Chọn--"
                      />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>SĐT Người Thân</label>
                    <Form.Item
                      name="phoneGuardian"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập SĐT người thân!',
                        },
                      ]}
                    >
                      <Input type="text" placeholder="0947999XXX" id="phoneGuardian" />
                    </Form.Item>
                  </div>
                  <div className="newStudentItem">
                    <label>Địa Chỉ Người Thân</label>
                    <Form.Item
                      name="addrGuardian"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập địa chỉ!',
                        },
                      ]}
                    >
                      <Input onChange={handle} type="text" placeholder="Ghi cụ thể địa chỉ" id="addrGuardian" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button type="submit" value="Submit">
                Thêm Mới
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default FormRegister;
