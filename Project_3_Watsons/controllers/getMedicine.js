const Medicine = require("../models/Medicine");

/* const index = async (req, res) => {
    try {
        const allMedicine = = await Medicine.
    }
} */
const data = async (req,res) => {
    const limit = 4000;
    const apiURL = `https://data.gov.sg/api/action/datastore_search?resource_id=43668192-c352-4420-9731-01043c67c471&limit=${limit}`
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        /* res.json(data); */
        const medicines = data.result.records.map(record => ({
            name: record.product_name,
            type: record.dosage_form,
            routeOfAdmin: record.route_of_administration,
            brand: record.manufacturer,
            strength: record.strength
        }));
        res.json(medicines);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
};


module.exports = {
    data,
}