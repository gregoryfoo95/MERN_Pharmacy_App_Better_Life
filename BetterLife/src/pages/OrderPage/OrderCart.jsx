import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '../../components/Cart/OrderBar';
import { Container } from 'react-bootstrap';
import Cancel from './Cancel';
import Store from './Store';
import Success from './Success';
import CartProvider from './CartContext';

function OrderCart() {
  const path = window.location.pathname;
  let content = null;

  switch (path) {
    case '/order':
      content = <Store />;
      break;
    case '/order/success':
      content = <Success />;
      break;
    case '/order/cancel':
      content = <Cancel />;
      break;
    default:
      content = <Store />;
      break;
  }

  return (
    <CartProvider>
      <Container>
        <NavbarComponent />
        {content}
      </Container>
    </CartProvider>
  );
}

export default OrderCart;
