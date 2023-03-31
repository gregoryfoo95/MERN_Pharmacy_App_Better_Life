import MedicineUpdateForm from "./MedicineUpdateForm"
import { Link } from "react-router-dom";
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MedicineUpdateButton({ medicine}) {

    return (
        <td>
            <Link to={`${medicine._id}/edit`}>
                <button>Edit</button>
            </Link>
        </td>
    )
}