import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import './tabStyle.scss';
import { useState } from 'react';
import CardItem from '../ItemRoomBuilding/cardItem';

const BsTabs = (props) => {
  const { roomBuildings } = props;
  const [key, setKey] = useState();

  return (
    <Container className="py-4 container-tab">
      <Row className="row-tab">
        <div className="tab-left">
          <Tabs
            transition={false}
            id="uncontrolled-tab-example"
            activeKey={key}
            onSelect={(k) => {
              setKey(k);
            }}
            className="mb1 p-0 py-3"
          >
            {roomBuildings.map((roomBuilding) => (
              <Tab className="tab-detail" eventKey={roomBuilding._id} title={roomBuilding.name} key={roomBuilding._id}>
                <div>
                  <CardItem cardItem={roomBuilding} />
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
        <div className="tab-right">
          <div className="tab-description">
            <p className="tab-description-tile">Hướng dẫn chi tiết: </p>
            <div className="content-description">
              <p className="spend-title">Những việc cần chuẩn bị để tiến hành đăng ký</p>
              <p className="spend-content">
                - Chứng minh nhân dân/thẻ căn cước công dân (mặt trước và mặt sau); <br></br>- Thông tin người thân hoặc
                người giám hộ; <br></br>- Giấy xác nhận/giới thiệu hoặc đơn đăng ký ở Ký túc xá có xác nhận của nhà
                trường <br></br> - Hình kích thước 4 x 6(nền xanh, áo sơ mi, chụp rõ khuôn mặt);
              </p>
              <p className="spend-title">Những việc cần lưu ý để trước khi đăng ký</p>
              <p className="spend-content">
                - Các giường đã có người sẽ có màu cam(chưa sẽ có màu đen); <br></br>- Sinh viên phải chọn phòng và
                giường thì mới chuyển sang trang nhập liệu thông tin; <br></br>- Giấy xác nhận/giới thiệu hoặc đơn đăng
                ký ở Ký túc xá có xác nhận của nhà trường <br></br> - Để chuyển sang trang nhập liệu để đăng ký sinh
                viên hãy nhấn vào nút tiếp theo;
              </p>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default BsTabs;
