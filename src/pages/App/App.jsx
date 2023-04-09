import { useState, useEffect } from 'react';
// import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MedicinePage from '../MedicinePage/MedicinePage';
import MedicineUpdateForm from '../MedicinePage/MedicineUpdateForm';
import PharmaPage from '../PharmaPage/PharmaPage';
import OrderCart from "../OrderPage/OrderCart";
import AuthPage from '../Auth/Authpage';
import StockPage from '../StockPage/StockPage';
import { getUser } from '../../../utils/users-service';
const BASE_URL = '/api/medicine';
import MainMap from '../MapPages/MainMap';
import MainSplit from '../UserMain/MainSplit';
import DirectionMap from '../MapPages/DirectionsMap';
import MedicineSearch from '../MedicineSearch/MedicineSearch';
import ContactForm from '../Auth/ContactForm';
import MedicineMap from '../MedicineSearch/MainMedicineSearch';
import AppointmentBooking from '../AppointmentPage/AppointmentBooking';
import DashboardPage from '../DashboardPage/DashboardPage';

// side bar
import Layout from '../../components/Layout/Layout';
import CustomSideBar from '../../components/SideBar/CustomSideBar';
import CustomNavBar from '../../components/NavBar/CustomNavBar';



function App() {
  const [isRtl, setIsRtl] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [collapseOnSelect, setCollapseOnSelect] = useState(false);
  const [exclusiveExpand, setExclusiveExpand] = useState(false);
  const [user, setUser] = useState(getUser());
  const [sideBarConfig, setSideBarConfig] = useState([
    {
      keyEvent: 'Home',
      classData: 'bi bi-house-door menu-icon',
      title: 'Home',
    },
  ]);
  const [routeConfig, setRouteConfig] = useState([]);
  const navigate = useNavigate();
  const themeName = isDarkTheme ? 'dark-nav' : 'color-nav';
  // const themeName = isDarkTheme ? 'dark' : 'light';
  const onSelect = pathUrl => {
    console.log('onSelect=>', pathUrl);
    navigate(pathUrl);
  };

  useEffect(() => {
    console.log(user);
    if (user == null) {
      setRouteConfig([
        {
          path: '/',
          element: <AuthPage setUser={setUser} />,
        },
        {
          path: '/welcome',
          element: <MainSplit />,
        },
        {
          path: '/map',
          element: <MainMap />,
        },
        {
          path: '/map/:id',
          element: <DirectionMap />,
        },
        {
          path: '/medicinemap',
          element: <MedicineMap />,
        },
        {
          path: '/medicinesearch',
          element: <MedicineSearch />,
        },
        {
          path: '/contact-us',
          element: <ContactForm />,
        },
      ]);
      setSideBarConfig([
        {
          keyEvent: 'Home',
          classData: 'bi bi-house-door menu-icon',
          title: 'Home',
          path: '/welcome',
        },
        {
          keyEvent: 'Map',
          classData: 'bi bi-hospital menu-icon',
          title: 'Pharmacist Availability',
          path: '/map',
        },
        {
          keyEvent: 'MedicineSearch',
          classData: 'bi bi-capsule menu-icon',
          title: 'Medicine Availability',
          path: '/medicinesearch',
        },
        {
          keyEvent: 'Home',
          classData: 'bi bi-person-fill menu-icon',
          title: 'Account',
          path: '/',
        },
        {
          keyEvent: 'Contact Us',
          classData: 'bi bi-envelope-fill menu-icon',
          title: 'Contact Us',
          path: '/contact-us',
        },
      ]);
    } else if (user.role == 'Pharmacist') {
      setRouteConfig([
        {
          path: '/home',
          element: <PharmaPage />,
        },
        {
          path: '/medicine',
          element: <MedicinePage />,
        },
        {
          path: '/stock',
          element: <StockPage />,
        },
        {
          path: '/medicine/:id/edit',
          element: <MedicineUpdateForm BASE_URL={BASE_URL} />,
        },
        {
          path: '/dashboard',
          element: <DashboardPage />,
        },
      ]);
      setSideBarConfig([
        {
          keyEvent: 'Home',
          classData: 'bi bi-house-door menu-icon',
          title: 'Home',
          path: '/home',
        },
        {
          keyEvent: 'Dashboard',
          classData: 'bi bi-speedometer menu-icon',
          title: 'Dashboard',
          path: '/dashboard',
        },
        {
          keyEvent: 'Medicine',
          classData: 'bi bi-prescription2 menu-icon',
          title: 'Medicine',
          path: '/medicine',
        },
        {
          keyEvent: 'Stock',
          classData: 'bi bi-archive menu-icon',
          title: 'Stock',
          path: '/stock',
        },
        {
          keyEvent: 'Profile',
          classData: 'bi bi-person-square menu-icon',
          title: 'Profile',
          path: '/home',
        },
      ]);
    } else if (user.role == 'Consumer') {
      console.log('Hello=>', user);
      setRouteConfig([
        {
          path: '/',
          element: <MainSplit />,
        },
        {
          path: '/map',
          element: <MainMap />,
        },
        {
          path: '/map/:id',
          element: <DirectionMap />,
        },
        {
          path: '/welcome',
          element: <MainSplit />,
        },
        {
          path: '/contact-us',
          element: <ContactForm />,
        },
        {
          path: '/order',
          element: <OrderCart />,
        },
        {
          path: '/medicinemap',
          element: <MedicineMap />,
        },
        {
          path: '/medicinesearch',
          element: <MedicineSearch />,
        },
        {
          path: '/appointment',
          element: <AppointmentBooking />,
        },
      ]);

      setSideBarConfig([
        {
          keyEvent: 'Home',
          classData: 'bi bi-house-door menu-icon',
          title: 'Home',
          path: '/welcome',
        },
        {
          keyEvent: 'Map',
          classData: 'bi bi-hospital menu-icon',
          title: 'Pharmacist Availability',
          path: '/map',
        },
        {
          keyEvent: 'MedicineSearch',
          classData: 'bi bi-capsule menu-icon',
          title: 'Medicine Availability',
          path: '/medicinesearch',
        },
        {
          keyEvent: 'Order',
          classData: 'bi bi-cart menu-icon',
          title: 'Place Order',
          path: '/order',
        },
        {
          keyEvent: 'Appointment',
          classData: 'bi bi-calendar-week menu-icon',
          title: 'Book Appointment',
          path: '/appointment',
        },
        {
          keyEvent: 'Contact Us',
          classData: 'bi bi-envelope-fill menu-icon',
          title: 'Contact Us',
          path: '/contact-us',
        },
      ]);
    }
  }, [user]);

  return (
    <Layout rtl={isRtl} children={''}>
      <CustomNavBar
        user={user}
        setUser={setUser}
        themeName={themeName}
        isRtl={isRtl}
        setIsRtl={setIsRtl}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        collapseOnSelect={collapseOnSelect}
        setCollapseOnSelect={setCollapseOnSelect}
        exclusiveExpand={exclusiveExpand}
        setExclusiveExpand={setExclusiveExpand}></CustomNavBar>

      <CustomSideBar
        exclusiveExpand={exclusiveExpand}
        collapseOnSelect={collapseOnSelect}
        onSelect={onSelect}
        themeName={themeName}
        isRtl={isRtl}
        sideBarConfig={sideBarConfig}></CustomSideBar>
      <main className="main-container container-fluid">
        <Routes>
          {routeConfig.map((item, i) => {
            //console.log(item);
            return (
              <Route
                key={`Route_${i}`}
                path={item.path}
                element={item.element}
              />
            );
          })}
        </Routes>
      </main>
    </Layout>
  );
}

export default App;
