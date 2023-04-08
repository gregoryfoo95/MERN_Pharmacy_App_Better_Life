import React from 'react';
import { Link } from 'react-router-dom';

export default function SplitMedicine() {
  return (
    <div className="">
      <Link to="/map" style={{ textDecoration: 'none' }}>
        <img
          src="./images/UserMainImg/imgMedicine.png"
          alt="Watson Pharmacy"
          style={{ width: '300px', height: '250px' }}
        />
        <p style={{ marginBottom: 0 }} />
      </Link>
    </div>
  );
}
