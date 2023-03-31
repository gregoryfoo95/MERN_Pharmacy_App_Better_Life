import MedicineDeleteButton from "./MedicineDeleteButton"

export default function MedicineList({medicines, setMedicines, BASE_URL}) {
    return (
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Name</th>
              <th>Type</th>
              <th>Strength</th>
              <th>Price</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td>{medicine.brand}</td>
                <td>{medicine.name}</td>
                <td>{medicine.type}</td>
                <td>{medicine.strength}</td>
                <td>{medicine.price}</td>
                <td>{new Date(medicine.expiry_date).toLocaleDateString()}</td>
              <MedicineDeleteButton setMedicines={ setMedicines } medicine={ medicine } BASE_URL={BASE_URL}/>
              </tr>
            ))}
          </tbody>
        </table>
    )
}