import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { getUser } from "../Auth/authService";


const Profile = () => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log("Getting use");
    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
    }
    getUserData();
  }, []);

  return (
    <div className="profile --my2">
      <>
      {!profile ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-data">
              <p>
                <b>Name : </b> {profile?.name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <p>
                <b>Store : </b> {profile?.store}
              </p>
              <p>
                <b>Available : </b> {profile?.available}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
