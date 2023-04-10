import { useState, useEffect } from 'react';
import { getUser } from '../../../utils/users-service';
import axios from 'axios';
import { Button } from 'react-bootstrap';
const BASE_URL = 'http://localhost:3000/api/user';
const BASE_URL_MAP = 'http://localhost:3000/api/map';

export default function AvailabilityCard() {
  const [user, setUser] = useState(getUser());
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${process.env.BACK_END_URL}/api/user/${user._id}`);
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchLocations() {
      try {
        const response = await axios.get(`${process.env.BACK_END_URL}/api/map`);
        setLocations(response.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
    fetchLocations();
  }, [selectedLocation]);

  const handleAvailClick = async e => {
    const token = localStorage.getItem('token');
    try {
      const newUser = {
        ...user,
        available: !user.available,
      };
      const response = await axios.put(`${process.env.BACK_END_URL}/api/user/${user._id}`, newUser, {
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`,
      });
      if (response.status === 201) {
        setUser(response.data);
        setSelectedLocation(user.store);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLocClick = async e => {
    const token = localStorage.getItem('token');
    try {
      const newUser = {
        ...user,
        store: selectedLocation,
      };

      const response = await axios.put(`${process.env.BACK_END_URL}/api/user/${user._id}`, newUser, {
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`,
      });
      if (response.status === 201) {
        setUser(response.data);
        setSelectedLocation(user.store);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLocationChange = e => {
    setSelectedLocation(e.target.value);
  };

  return (
    <>
      <h5>My availability: {user.available ? 'Available' : 'Unavailable'}</h5>
      <Button
        style={{ backgroundColor: '#00A0A0', marginBottom: '10px' }}
        onClick={handleAvailClick}>
        Toggle Availability
      </Button>
      <h5>Current Store Location: {user?.store?.storeName} </h5>
      {locations.length > 0 ? (
        <select name="location" onChange={handleLocationChange}>
          {locations.map(location => (
            <option key={location._id} value={location._id}>
              {location.storeName}
            </option>
          ))}
        </select>
      ) : (
        <p>Loading locations...</p>
      )}
      <Button
        style={{ backgroundColor: '#00A0A0', marginBottom: '10px' }}
        onClick={handleLocClick}>
        Save Location
      </Button>
    </>
  );
}
