import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userLoginInfo = useSelector((state) => state.loginUser);
  const { userInfo } = userLoginInfo;
  const userRegisterInfo = useSelector((state) => state.registerUser);
  const { userInfo: registerUserInfo } = userRegisterInfo;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialData = {
    name: userInfo.name || registerUserInfo.name,
    email: userInfo.email || registerUserInfo.email,
    password: "",
  };

  const [userData, setUserData] = useState(initialData);
  const { name, email, password } = userData;

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    }
  }, [userInfo, navigate]);

  const onChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Logout Successfully");
  };

  return (
    <div className="mt-5">
      <div className="profileHeader">
        <h1>My Profile</h1>
        <button className="btn btn-primary" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="profileHeader w-50 mt-3">
        <p className="lead m-0">Personal Details</p>
        <button className="btn btn-primary">Update Profile</button>
      </div>
      <div className="card bg-light card-body w-50 mt-3">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            placeholder="Password"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
