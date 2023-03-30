const Medicine = require("../models/Medicine");


const data = async (req,res) => {
    const limit = 1000;
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
        
        await Medicine.deleteMany({})
        const createdMedicines = await Medicine.create(medicines);
        res.status(200).json(createdMedicines);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
};

/* const seed = async () => {
  try {
    await Medicine.deleteMany({});
    const medicines = await data();
    console.log(medicines);
    await Medicine.create(medicines);
    res.json(medicines);
  } catch (error) {
    console.log(error);
        throw new Error("An error occurred while seeding the database");
  }
}; */

module.exports = {
    data,
    //seed
}