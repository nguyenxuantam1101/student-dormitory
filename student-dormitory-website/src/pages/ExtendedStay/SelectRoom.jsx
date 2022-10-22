import React from 'react';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useState } from 'react';
import CardItem from '~/pages/Register/ItemRoomBuilding/cardItem';

const SelectRoom = (props) => {
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
      </Row>
    </Container>
  );
};

export default SelectRoom;
