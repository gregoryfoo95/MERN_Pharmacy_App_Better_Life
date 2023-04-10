import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function MedicineUpdateButton({ medicine }) {
  return (
    <td>
      <Link to={`${medicine._id}/edit`}>
        <Button style={{ backgroundColor: '#00A0A0' }}>Edit</Button>
      </Link>
    </td>
  );
}
