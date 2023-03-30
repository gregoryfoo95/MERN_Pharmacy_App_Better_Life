import axios from 'axios';

export default function MedicineDeleteButton({ setMedicines, medicine, BASE_URL }) {
    // Handle click event for deleting a medicine
    const handleDeleteClick = async (id) => {
        try {
        await axios.delete(`${BASE_URL}/medicine/${id}`);
        setMedicines((prevMedicines) => prevMedicines.filter((m) => m._id !== id));
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <td>
            <button onClick={() => handleDeleteClick(medicine._id)}>Delete</button>
        </td>
    )
}