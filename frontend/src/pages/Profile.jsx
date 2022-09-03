import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { updateUser } from "../actions/userActions";
import Loader from "../components/Loader";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { AiFillHome } from "react-icons/ai";
import { FaGreaterThan } from "react-icons/fa";

const Profile = () => {
  const userLoginInfo = useSelector((state) => state.loginUser);
  const { userInfo } = userLoginInfo;
  const userRegisterInfo = useSelector((state) => state.registerUser);
  const { userInfo: registerUserInfo } = userRegisterInfo;
  const userUpdateInfo = useSelector((state) => state.updateUser);
  const { success, loading } = userUpdateInfo;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialData = {
    name: userInfo ? userInfo.name : registerUserInfo.name,
    email: userInfo ? userInfo.email : registerUserInfo.email,
    password: "",
  };

  const [userData, setUserData] = useState(initialData);
  const { name, email, password } = userData;

  useEffect(() => {
    dispatch({
      type: USER_UPDATE_RESET,
    });

    if (!userInfo && !registerUserInfo) {
      navigate("/sign-in");
    }

    if (success) {
      toast.success("Information Updated");
    }
  }, [userInfo, navigate, success, dispatch, registerUserInfo]);

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

  const onSubmit = () => {
    dispatch(updateUser(userData, userInfo._id));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-3">
      <div className="profileHeader">
        <h1>My Profile</h1>
        <button className="btn btn-primary" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="profileHeader w-100 w-md-50 mt-3">
        <p className="lead m-0">Personal Details</p>
        <button className="btn btn-primary" onClick={onSubmit}>
          Update Profile
        </button>
      </div>
      <div className="card bg-light card-body w-100 w-md-50 mt-3">
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

      <Link to="/create-listing" className="mt-3 card card-body nav-link">
        <div className="profileHeader">
          <div>
            <AiFillHome size={20} />
          </div>
          <div>
            <h5>Sell or Rent your Home</h5>
          </div>
          <div>
            <FaGreaterThan size={20} />
          </div>
        </div>
      </Link>

      <Link className="nav-link mt-3" to="/user-listing">
        <button className="btn btn-primary">View User Listings</button>
      </Link>
    </div>
  );
};

export default Profile;
