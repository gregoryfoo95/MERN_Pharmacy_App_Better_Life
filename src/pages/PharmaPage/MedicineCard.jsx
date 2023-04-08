import { Link } from "react-router-dom";

export default function MedicineCard () {

    return (
        <Link to={`/medicine`} style={{textDecoration: "none"}}>
            <div 
                style={{
                    backgroundColor: "#E42313",
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
            >Medicine Database</div>
        </Link>
    )
}