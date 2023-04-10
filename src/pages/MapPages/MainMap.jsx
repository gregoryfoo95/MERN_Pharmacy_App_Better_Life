import React from 'react';
import MapComponent from './MapComponent';
import MarkerDetails from './Path'


function MainMap() {
  return (
    <div>
      <div className="Map" style={{ width: '80vw', height: '80vh' }}>
        <MapComponent zoom={17} />
        <MarkerDetails />
      </div>
    </div>
  );
}

export default MainMap;