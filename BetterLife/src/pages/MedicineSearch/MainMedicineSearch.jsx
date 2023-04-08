import React from 'react';
import MedicineSearch from './MedicineSearch';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MedicineMap() {
  const filteredMedicines = [];
  return (
    <Container fluid style={{ width: '100vw', height: '100vh' }}>
      <Row className="h-100">
        <Col>
          <MedicineSearch filteredMedicines={filteredMedicines} zoom={17} />
        </Col>
      </Row>
    </Container>
  );
}

export default MedicineMap;
