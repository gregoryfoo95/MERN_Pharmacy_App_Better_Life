import StockCard from "./StockCard";
import MedicineCard from "./MedicineCard";
import AvailabilityCard from "./AvailabilityCard";

export default function PharmaPage() {
 return (
    <>
        <h1>Pharmacist's Homepage</h1>
        <AvailabilityCard />
        &nbsp;
        <StockCard />
         &nbsp;
        <MedicineCard />
    </>
 )
}