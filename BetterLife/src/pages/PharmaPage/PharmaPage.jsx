import { Container, Row, Col, Card } from 'react-bootstrap';
import StockCard from './StockCard';
import MedicineCard from './MedicineCard';
import AvailabilityCard from './AvailabilityCard';

export default function PharmaPage() {
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="text-center" style={{ color: '#3A1730' }}>
              Pharmacist's Homepage
            </h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="mb-3" style={{ borderColor: '#3A1730' }}>
              <Card.Body>
                <AvailabilityCard />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3" style={{ borderColor: '#3A1730' }}>
              <Card.Body>
                <StockCard />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3" style={{ borderColor: '#3A1730' }}>
              <Card.Body>
                <MedicineCard />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
