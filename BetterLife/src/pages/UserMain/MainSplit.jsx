import React from 'react';
import SplitMap from './SplitMap';
import SplitMedicine from './SplitMedicine';

// import 'bootstrap/dist/css/bootstrap.min.css';

// import SplitFavourites from './SplitFavourites';

export default function MainSplit() {
  return (
    <div
      className="flex"
      style={{ textAlign: 'center', fontFamily: 'Montserrat' }}>
      <h1>User's Homepage</h1>
      <SplitMap />
      <p></p>
      <SplitMedicine />
      <p></p>
      {/* <SplitFavourites /> */}
    </div>
  );
}
