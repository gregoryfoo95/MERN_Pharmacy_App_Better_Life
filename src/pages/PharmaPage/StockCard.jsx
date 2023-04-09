import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function StockCard() {
  return (
    <Link to="/stock" style={{ textDecoration: 'none' }}>
      <Card
        style={{
          backgroundColor: '#00A0A0',
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
          Stock Inventory Management
        </Card.Text>
      </Card>
    </Link>
  );
}
