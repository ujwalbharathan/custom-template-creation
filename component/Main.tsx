import React = require('react');
import { Col, Row } from 'react-bootstrap';
import { Canvas } from './canvas/Canvas';
import { Components } from './components/Components';
import { HeadProperties } from './properties/headProperties/HeadProperties';
import { SideProperties } from './properties/sideProperties/SideProperties';

export const Main = () => {
  // const dragType = React.useRef();

  const [dragType, SetDragType] = React.useState<any | string>(null);

  console.log(dragType, 'dragType');

  return (
    <Row className="m-0 p-0">
      <Col lg={2} md={2} sm={2} xs={2} className="p-0">
        <Components setDragType={SetDragType} />
      </Col>
      <Col lg={6} md={6} sm={6} xs={6} className="p-0">
        <HeadProperties />
        <Canvas dragType={dragType} />
      </Col>
      <Col lg={4} md={4} sm={4} xs={4} className="p-0">
        <SideProperties />
      </Col>
    </Row>
  );
};
