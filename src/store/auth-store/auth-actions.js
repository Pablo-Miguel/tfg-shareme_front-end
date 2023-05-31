import axios from "axios";

import { authActions } from "./auth-slice";
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
  setUserId,
  removeUserId
} from "../../utils/storage";
import { navigate } from "../../utils/router-supplier";

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const fetchedData = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      dispatch(authActions.login({ user: fetchedData.data }));
    } catch (error) {
      dispatch(authActions.logout());
      removeAuthToken();
      navigate("/login");
    }
  };
};

export const signUp = (firstName, lastName, nickName, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setError(null));
      const fetchedData = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/users/signup`,
        {
          firstName,
          lastName,
          nickName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(authActions.login({ user: fetchedData.data.user }));

      setAuthToken(fetchedData.data.token);
      setUserId(fetchedData.data.user._id);
      navigate("/");
    } catch (error) {
      if(error.request.status === 400) {
        dispatch(
          authActions.setError({
            message: "Email or NickName already exists",
            status: 400,
          })
        );
      } else {
        dispatch(
          authActions.setError({
            message: error.message || "Something went wrong",
            status: 500,
          })
        );
      }
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setError(null));
      const fetchedData = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/users/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(authActions.login({ user: fetchedData.data.user }));

      setAuthToken(fetchedData.data.token);
      setUserId(fetchedData.data.user._id);
      navigate("/");
    } catch (error) {
      dispatch(
        authActions.setError({
          message: "User or password is invalid",
          status: 401,
        })
      );
    }
  };
};

export const logout = (isAll = false) => {
  return async (dispatch) => {
    try {
      let urlBase = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/`;
      if (isAll) urlBase += "logoutAll";
      else urlBase += "logout";

      const fetchedData = await axios.get(urlBase, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      dispatch(authActions.logout({ user: fetchedData.data.user }));

      removeAuthToken();
      removeUserId();
      navigate("/login");
    } catch (error) {
      console.log("Can not logout!");
    }
  };
};
