import React from 'react';
import MedicineSearch from './MedicineSearch';

function MedicineMap() {
  const filteredMedicines = [];
  return (
    <div className="Map" style={{ width: '100vw', height: '100vh' }}>
      <MedicineSearch filteredMedicines={filteredMedicines} zoom={17} />
    </div>
  );
}

export default MedicineMap;