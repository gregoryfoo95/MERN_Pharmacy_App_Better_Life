import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { updateUser } from "../Auth/authService";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    store: user?.store || "",
    available: user?.available || "",
  };
  const [profile, setProfile] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        store: profile.store,
        available: profile.available,
      };
      const data = await updateUser(formData);
      console.log(data);
      toast.success("User updated");
      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <div>Loading...</div>}
      <Card cardClass={"card --flex-dir-column"}>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Store:</label>
              <input
                type="text"
                name="store"
                value={profile.store}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Available:</label>
              <input
                type="text"
                name="available"
                value={profile.available}
                onChange={handleInputChange}
              />
            </p>
            <div>
              <button className="--btn --btn-primary">Save Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
