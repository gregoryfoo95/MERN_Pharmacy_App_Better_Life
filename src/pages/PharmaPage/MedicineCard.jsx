import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MedicineCard() {
  return (
    <Link to="/medicine" style={{ textDecoration: 'none' }}>
      <Card
        style={{
          backgroundColor: '#E42313',
          height: '30vh',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Card.Text
          className="text-center"
          style={{
            color: '#E5F5F5',
            fontSize: '25px',
            fontFamily: 'Montserrat, sans-serif',
          }}>
          Medicine Database
        </Card.Text>
      </Card>
    </Link>
  );
}
