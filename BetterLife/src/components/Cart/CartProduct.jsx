import Button from 'react-bootstrap/Button';
import { CartContext } from "../../pages/OrderPage/CartContext";
import { useContext } from "react";
import { getProductData } from "../../../utils/productStore";

function CartProduct(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const productData = getProductData(id);

    const [products, setProducts] = useState([]);
/* 
    useEffect(() => {
        async function fetchProducts
    }, []); */

    return (
        <>
            <h3>{productData.title}</h3>
            <p>{quantity} total</p>
            <p>${ (quantity * productData.price).toFixed(2) }</p>
            <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )
}

export default CartProduct;