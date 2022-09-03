import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const SignIn = () => {
  const initialData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUserData = useSelector((state) => state.loginUser);
  const { userInfo, loading, error } = loginUserData;

  useEffect(() => {
    if (userInfo) {
      toast.success("Logged In Successfully");
      navigate("/");
    }

    if (error) {
      toast.error(error);
    }
  }, [userInfo, navigate, error]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));

    setFormData(initialData);
  };

  return (
    <div className="container mt-3">
      <h1>Welcome Back!</h1>
      {loading && <Loader />}
      <form onSubmit={onSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="d-flex mt-3 align-items-center">
          <h2 className="m-0">Sign In</h2>
          <button className="btn-mine ms-5">
            <FaGreaterThan size={20} />
          </button>
        </div>
      </form>
      <div className="row mt-5">
        <Link to="/sign-up" className="nav-link text-center signInstead">
          <h5>Sign Up Instead</h5>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
