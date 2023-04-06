import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getUser } from "../../../utils/users-service";
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/user"

export default function AvailabilityCard() {
    const [user, setUser] = useState(getUser());

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`${BASE_URL}/${user._id}`);
                setUser(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUser();
    }, []);

    const handleClick = async () => {
        const token = localStorage.getItem("token");
        try {
            const newUser = {
                ...user,
                available: !user.available
            }
            const response = await axios.put(`${BASE_URL}/${user._id}`, newUser, {
                headers: {
                    'Content-Type': 'application/json'
                },
                Authorization: `Bearer ${token}`,
            });
            if (response.status === 201) {
                setUser(response.data);
            }
            
        } catch (err) {
            console.error(err);   
        }
    }
    return (
        <>
            <h5>My availability: {user.available ? "Available" : "Unavailable"}</h5>
            <button onClick={handleClick}>Toggle Availability</button>
        </>
    )
}