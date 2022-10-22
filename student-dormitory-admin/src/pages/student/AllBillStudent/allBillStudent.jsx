import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import './allBillStudentStyle.css';
import { useNavigate } from 'react-router-dom';
import ItemFeeInvoice from './feeInvoices/itemFeeInvoices';
import ItemCostOfLiving from './billCostOfLiving/itemBillCostOfLiving';
import ItemViolationRecord from './violation/itemViolations';
import { createAxios } from '../../../lib/createAxios';
import { loginSuccess } from '../../../redux/authSlice';
import 'reactjs-popup/dist/index.css';
import { useParams } from 'react-router-dom';
const API = 'https://nqt-server-dormitory-manager.herokuapp.com/api/v1/';
function AllBillStudent(props) {
  const { student } = props;
  const [billCostLivings, setBillCostLivings] = useState(null);
  const [feeInvoices, setFeeInvoices] = useState(null);
  const [billViolations, setBillViolations] = useState(null);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  let date = new Date();
  const navigate = useNavigate();

  const { id_student } = useParams();
  // const student = useSelector((state) => state.studentDetail.studentDetail.dataStudent);
  const formatNumber = (q) => {
    return q.toLocaleString('vn-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  const handleCreateNew = () => {
    navigate(`/admin/room/${student?.roomBuilding?.Room._id}/create-bill`);
  };
  const handleCreateNewViolation = () => {
    navigate(`/admin/student/create/violation/${id_student}`);
  };
  useEffect(() => {
    (async function () {
      const feeInvoicesData = await axiosJWT.get(`${API}feeInvoice/student/${id_student}?page=1&limit=1`, {
        headers: { token: `Bearer ${user?.accessToken}` },
      });
      setFeeInvoices(feeInvoicesData.data?.feeInvoices);
      const roomId = student?.roomBuilding?.Room?._id;

      const billCostOfLivings = await axiosJWT.get(`${API}billCostOfLiving/roomFollow/${roomId}?page=1&limit=1`, {
        headers: { token: `Bearer ${user?.accessToken}` },
      });

      setBillCostLivings(billCostOfLivings.data?.billCostOfLivings);
      const billViolations = await axiosJWT.get(
        `${API}violationRecord/violation/student/${id_student}?page=1&limit=1`,
        {
          headers: { token: `Bearer ${user?.accessToken}` },
        },
      );
      setBillViolations(billViolations.data?.violationRecords);
    })();
  }, []);
  return (
    <div className="all-bill-student">
      <div className="invoices card-bill">
        <div className="box-title">
          <label className="bill-title">Phiếu thu tiền thuê KTX</label>
        </div>
        {feeInvoices && feeInvoices.length > 0 ? (
          feeInvoices.map((feeInvoice) => <ItemFeeInvoice key={feeInvoice._id} feeInvoice={feeInvoice} />)
        ) : (
          <div className="empty-msg">
            <h6 className="message">Đang cập nhật...</h6>
          </div>
        )}
      </div>
      <div className="bill-cost-livings card-bill">
        <div className="box-title">
          <label className="bill-title">Phiếu hóa đơn điện nước</label>
        </div>
        {billCostLivings && billCostLivings.length > 0 ? (
          billCostLivings.map((billCostOfLiving) => (
            <ItemCostOfLiving key={billCostOfLiving._id} billCostOfLiving={billCostOfLiving} />
          ))
        ) : (
          <div className="empty-msg">
            <h6 className="message">Đang cập nhật...</h6>
          </div>
        )}
        <div className="detailBtnCreate">
          <button className="btn-show-all" onClick={handleCreateNew}>
            Tạo mới{' '}
          </button>
        </div>
      </div>
      <div className="bill-violation card-bill">
        <div className="box-title">
          <label className="bill-title">Biên bản vi phạm</label>
        </div>
        {billViolations && billViolations.length > 0 ? (
          billViolations.map((violation) => <ItemViolationRecord key={violation._id} violation={violation} />)
        ) : (
          <div className="empty-msg">
            <h6 className="message">Đang cập nhật...</h6>
          </div>
        )}
        <div className="detailBtnCreate">
          <button className="btn-show-all" onClick={handleCreateNewViolation}>
            Lập biên bản{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllBillStudent;
