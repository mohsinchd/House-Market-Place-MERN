import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const userLoginInfo = useSelector((state) => state.loginUser);
  const { userInfo } = userLoginInfo;
  const userRegisterInfo = useSelector((state) => state.registerUser);
  const { userInfo: registerUserInfo } = userRegisterInfo;

  useEffect(() => {
    if (userInfo || registerUserInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [userInfo, checkingStatus, registerUserInfo]);

  console.log(isLoggedIn);

  return { isLoggedIn, checkingStatus };
};

export default useAuth;
