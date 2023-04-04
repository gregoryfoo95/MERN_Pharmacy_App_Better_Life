export default function OrderDetails({ cart }) {
    return (
      <div>
        <h1>Cart</h1>
        {cart.lineItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Price($)</th>
                <th>Quantity</th>
                <th>Total Price($)</th>
              </tr>
            </thead>
            <tbody>
              {cart.lineItems.map((lineItem, index) => (
                <tr key={index}>
                  <td>{lineItem.medicine.name}</td>
                  <td>{lineItem.medicine.brand}</td>
                  <td>{lineItem.medicine.price.toFixed(2)}</td>
                  <td>{lineItem.qty}</td>
                  <td>{lineItem.extPrice.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>Total:</strong>
                </td>
                <td>
                  <strong>{cart.totalPrice}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
  