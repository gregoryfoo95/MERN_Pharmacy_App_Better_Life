import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function MedicineDeleteButton({ setMedicines, medicine, BASE_URL }) {
    // Handle click event for deleting a medicine
    const handleDeleteClick = async (id) => {
        const token = localStorage.getItem("token");
        try {

        await axios.delete(`${import.meta.env.VITE_APP_BACK_END_URL}/api/stock/${id}`, {
            headers: {
            "Content-Type": "application/json",
            },
            Authorization: `Bearer ${token}`,
        });

        await axios.delete(`${import.meta.env.VITE_APP_BACK_END_URL}/api/medicine/${id}`, {
            headers: {
            "Content-Type": "application/json",
            },
            Authorization: `Bearer ${token}`,
        });

        setMedicines((prevMedicines) => prevMedicines.filter((m) => m._id !== id));
        } catch (err) {
        console.error(err);
        }
    };

  return (
    <td>
      <Button
        onClick={() => handleDeleteClick(medicine._id)}
        style={{ backgroundColor: '#E42313' }}>
        Delete
      </Button>
    </td>
  );
}
