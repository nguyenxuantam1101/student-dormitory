import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { getRoomBuilding } from '~/redux/apiRequest';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { showToastError, showToastSuccess } from '~/utils/showToastMessage';
import { createAxios } from '~/utils/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import Cookies from 'js-cookie';
import DialogChangeRoom from '~/components/DialogForm/DialogChangeRoom';

export default function CardItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bedChecked, setBedChecked] = useState(0);

  const { cardItem } = props;

  const formatNumber = (q) => {
    return q.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  const handleCheckedChange = (e) => {
    setBedChecked(parseInt(e.target.value));
  };
  const [openDialogChangeRoom, setOpenDialogChangeRoom] = useState(false);
  const handleContinue = (e) => {
    e.preventDefault();
    if (user && refreshTokenStudent) {
      setOpenDialogChangeRoom(!openDialogChangeRoom);
    } else {
      getRoomBuilding(dispatch, navigate, cardItem?._id, '/register/form-register', parseInt(bedChecked));
    }
    if (bedChecked === 0) {
      showToastError('Vui lòng chọn giường', 5000);
    }
  };
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const refreshTokenStudent = Cookies.get('refreshTokenStudent');
  const AcceptChangeRoom = async (timeIn) => {
    if (cardItem && bedChecked && timeIn) {
      try {
        const res = await axiosJWT.put(
          `${process.env.REACT_APP_API}student/changeRoom`,
          {
            room: cardItem._id,
            numberBed: bedChecked,
            timeIn: timeIn,
          },
          {
            headers: { token: `Bearer ${user?.accessToken}` },
          },
        );
        showToastSuccess(res.data.message, 5000);
      } catch (error) {
        showToastError(error.response.data.message, 10000);
      }
    }

    console.log(timeIn);
    console.log(cardItem._id);

    console.log(bedChecked);
  };

  return (
    <div className="card-item" style={{ maxWidth: '57rem', height: '17rem', borderRadius: '10px' }}>
      <div className="cards-container">
        <div className="course">
          <div className="course-preview">
            <h6>{cardItem?.building?.name}</h6>
            <h2>{cardItem?.name}</h2>
          </div>
          <div className="course-info">
            <div className="info-room">
              <p className="title-room">
                Giá thuê <span className="value-room">{cardItem?.priceRoom && formatNumber(cardItem?.priceRoom)}</span>
                /tháng
              </p>
              <p className="title-room">
                Trạng thái phòng
                <span className="value-room">
                  {cardItem?.amountBed.filter((bed) => !bed.student).length === 0
                    ? 'Hết giường'
                    : 'Còn ' + cardItem?.amountBed.filter((bed) => !bed.student).length + ' giường'}
                </span>
              </p>
              <p className="title-room">
                Phòng <span className="value-room">{cardItem?.amountBed.length} </span>giường
              </p>
            </div>
            <form onSubmit={(e) => handleContinue(e)} className="form-number-bed">
              {cardItem?.amountBed.map((bed) => {
                return (
                  <FormControlLabel
                    key={bed._id}
                    value={bed.numberBed}
                    control={
                      bed.student ? (
                        <Radio checked={true} name="radio-buttons-bed-full" color="warning" />
                      ) : (
                        <Radio
                          onChange={(e) => handleCheckedChange(e)}
                          checked={bedChecked === bed.numberBed}
                          name="radio-buttons-bed-empty"
                        />
                      )
                    }
                    labelPlacement="top"
                    label={<PersonIcon style={bed.student ? { color: 'orange' } : {}} />}
                  />
                );
              })}
              <button type="submit" className="btn">
                {user && refreshTokenStudent ? 'Đổi Phòng' : 'Tiếp Tục'}
              </button>
              <DialogChangeRoom
                open={openDialogChangeRoom}
                onOpenDialog={handleContinue}
                onAgreeAction={AcceptChangeRoom}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
