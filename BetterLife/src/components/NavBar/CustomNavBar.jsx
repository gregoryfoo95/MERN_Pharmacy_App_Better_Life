// Don't forget the import
import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../../utils/users-service';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import classNames from 'classnames';
import CheckBox from './CheckBox';

export default function CustomNavBar({
  user,
  setUser,
  themeName,
  isRtl,
  setIsRtl,
  isDarkTheme,
  setIsDarkTheme,
  collapseOnSelect,
  setCollapseOnSelect,
  exclusiveExpand,
  setExclusiveExpand,
}) {
  const welcomeMessage = user === null ? '' : `Welcome ${user.name}`;
  const navigate = useNavigate();
  const handleLogOut = () => {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
    navigate('/');
  };

  return (
    <Navbar
      className={`main-header ${themeName}`}
      expand="lg"
      // bg={themeName}
      variant={'dark'}>
      <Navbar.Brand title="Better Life" className="d-block d-lg-none">
        <img src="./images/UI/3.png" alt="BetterLife" className="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      {user && <Navbar.Brand>{welcomeMessage}</Navbar.Brand>}
      <Navbar.Collapse className={classNames(!isRtl && 'justify-content-end')}>
        <Nav>
          {user && <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>}

          <NavDropdown
            className={classNames(!isRtl && 'dropdown-left')}
            title="Settings"
            id="basic-nav-dropdown">
            <NavDropdown.ItemText>
              <CheckBox
                id="darkThemeSwitcher"
                checked={isDarkTheme}
                onChange={() => setIsDarkTheme(!isDarkTheme)}
                text={themeName}
              />
            </NavDropdown.ItemText>
            <NavDropdown.ItemText>
              <CheckBox
                id="rtlSwitcher"
                checked={isRtl}
                onChange={() => setIsRtl(!isRtl)}
                text={isRtl ? 'right to left' : 'left to right'}
              />
            </NavDropdown.ItemText>
            <NavDropdown.ItemText>
              <CheckBox
                id="collapseOnSelectSwitcher"
                checked={collapseOnSelect}
                onChange={() => setCollapseOnSelect(!collapseOnSelect)}
                text="collapse on select"
              />
            </NavDropdown.ItemText>
            <NavDropdown.ItemText>
              <CheckBox
                id="exclusiveExpandSwitcher"
                checked={exclusiveExpand}
                onChange={() => setExclusiveExpand(!exclusiveExpand)}
                text="exclusive expand"
              />
            </NavDropdown.ItemText>
          </NavDropdown>
        </Nav>
        <span></span>
      </Navbar.Collapse>
    </Navbar>
  );
}
