import React from 'react';
import { Link } from "react-router-dom";

export default function SplitFavourites () {

    return (
        <Link to={`/favourites`} style={{textDecoration: "none"}}>
            <div
                style={{
                    backgroundColor: "#703201",
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
            >Favourites</div>
        </Link>
    )
}