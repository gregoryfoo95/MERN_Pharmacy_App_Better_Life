const productsArray = [
    {
        id: "price_1MtkB6EnqLsF1BhO5k1txFI5",
        title: "NEUROBION",
        price: 17.00
    },
    {
        id: "price_1Mtk9gEnqLsF1BhORhPGyJQr",
        title: "Tiger Balm",
        price: 9.00
    },
    {
        id: "price_1Mtk8pEnqLsF1BhOLSjlQD1L",
        title: "NIN JIOM",
        price: 8.00
    },
    {
        id: "price_1Mtk7CEnqLsF1BhOhvCxiJ9l",
        title: "Vicks",
        price: 7.00
    },
    {
        id: "price_1Mtk3UEnqLsF1BhOAn8F93un",
        title: "Panadol",
        price: 11.00
    },
    {
        id: "price_1Mtk0xEnqLsF1BhOVGSaM3TE",
        title: "Clarityn",
        price: 20.00
    },
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };
