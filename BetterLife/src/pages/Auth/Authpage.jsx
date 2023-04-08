import { Container, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';

export default function AuthPage({ setUser }) {
  return (
    <div
      className="text-center"
      style={{
        fontFamily: 'Montserrat',
      }}>
      <h1>Authentication Page</h1>
      <Tabs
        defaultActiveKey="authpage"
        id="justify-tab-example"
        className="mb-3"
        justify>
        <Tab eventKey="login" title="Login">
          <LoginPage setUser={setUser} />
        </Tab>
        <Tab eventKey="register" title="Registration">
          <RegisterPage />
        </Tab>
        <Tab eventKey="forget" title="Forget?">
          <ForgotPassword />
        </Tab>
      </Tabs>
    </div>
  );
}
