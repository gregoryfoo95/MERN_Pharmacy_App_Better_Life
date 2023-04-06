import React from 'react';
import { Link } from "react-router-dom";

export default function SplitMedicine () {

    return (
        <Link to={`/medicinesearch`} style={{textDecoration: "none"}}>
            <div
                style={{
                    backgroundColor: "#4E806B",
                    backgroundPosition: "center",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundSize: "cover",
                    height: "30vh",
                    color: "#E5F5F5",
                    fontSize: "40px",
                    fontFamily: 'Montserrat, sans-serif',
                    borderRadius: "15px",
                }}
            >Search For Medicine</div>
        </Link>
    )
}