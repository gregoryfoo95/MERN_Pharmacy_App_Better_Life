// Don't forget the import
import { Link } from 'react-router-dom';
import * as userService from '../../../utils/users-service';

export default function NavBar({ user, setUser }) {
    const welcomeMessage = user === null ? "" : `Welcome ${user.name}`;


    const handleLogOut = () => {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }

  return (
    <nav>
      <Link to="" onClick={handleLogOut}>Log Out</Link>
      &nbsp; | &nbsp;
      {welcomeMessage}
    </nav>
  );
}