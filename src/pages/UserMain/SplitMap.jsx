import React from 'react';
import { Link } from 'react-router-dom';
import PharmacyImg from '../../../images/UserMainImg/imgPharmacist.png';

export default function SplitMap() {
  return (
    <Link to={`/map`} style={{ textDecoration: 'none' }}>
      <div className="">
        <Link to="/map" style={{ textDecoration: 'none' }}>
          <img
            src={PharmacyImg}
            alt="Watson Pharmacy"
            style={{ width: '300px', height: '250px' }}
          />
          <p style={{ marginBottom: 0 }} />
        </Link>
      </div>
    </Link>
  );
}
