import { useState, useEffect } from 'react';
// import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MedicinePage from '../MedicinePage/MedicinePage';

import MedicineUpdateForm from '../MedicinePage/MedicineUpdateForm';
import PharmaPage from '../PharmaPage/PharmaPage';
// import OrderCart from "../OrderPage/OrderCart";
// import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import AuthPage from '../Auth/Authpage';
import StockPage from '../StockPage/StockPage';
import { getUser } from '../../../utils/users-service';

const BASE_URL = '/api/medicine';
import MainMap from '../MapPages/MainMap';
import MainSplit from '../UserMain/MainSplit';
import DirectionMap from '../MapPages/DirectionsMap';
import MedicineSearch from '../MedicineSearch/MedicineSearch';
import ContactForm from '../Auth/ContactForm';

// import MedicineMap from '../MedicineSearch/MainMedicineSearch';

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
      ]);
      setSideBarConfig([
        {
          keyEvent: 'Home',
          classData: 'bi bi-house-door menu-icon',
          title: 'Home',
          path: '/',
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
          path: '/home',
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
        // {
        //   path: '/order',
        //   element: <OrderCart />,
        // },
        // {
        //   path: '/medicinemap',
        //   element: <MedicineMap />,
        // },
        {
          path: '/medicinesearch',
          element: <MedicineSearch />,
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
          classData: 'bi bi-compass menu-icon',
          title: 'Map',
          path: '/map',
        },
        {
          keyEvent: 'Contact Us',
          classData: 'bi bi-person-lines-fill menu-icon',
          title: 'Contact Us',
          path: '/contact-us',
        },
        {
          keyEvent: 'Order',
          classData: 'bi bi-clipboard menu-icon',
          title: 'Order',
          path: '/order',
        },
        // {
        //   keyEvent: 'MedicineMap',
        //   classData: 'bi bi-clipboard menu-icon',
        //   title: 'Medicine Map',
        //   path: '/medicinemap',
        // },
        {
          keyEvent: 'MedicineSearch',
          classData: 'bi bi-clipboard menu-icon',
          title: 'Medicine Search',
          path: '/medicinesearch',
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
            console.log(item);
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
