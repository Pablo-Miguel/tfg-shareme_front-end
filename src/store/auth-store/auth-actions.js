import { authActions } from "./auth-slice";
import axios from "axios";

import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from "../../utils/storage";
import { useRouter } from "../../hooks/useRouter";

export const checkAuth = () => {
  return async (dispatch) => {
    const router = useRouter();
    try {
      const fetchedData = await axios.get("http://127.0.0.1:8000/users/me", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      dispatch(authActions.login({ user: fetchedData.data }));
    } catch (error) {
      dispatch(authActions.logout());
      removeAuthToken();
      router.navigate("/login");
    }
  };
};

export const signUp = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    const router = useRouter();
    try {
      dispatch(authActions.setError(null));
      const fetchedData = await axios.post(
        "http://127.0.0.1:8000/users/signup",
        {
          firstName,
          lastName,
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
      router.navigate("/");
    } catch (error) {
      dispatch(
        authActions.setError({
          message: "Oh no! Something went wrong!",
          status: 500,
        })
      );
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const router = useRouter();
    try {
      dispatch(authActions.setError(null));
      const fetchedData = await axios.post(
        "http://127.0.0.1:8000/users/login",
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
      router.navigate("/");
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
    const router = useRouter();
    try {
      let urlBase = "http://127.0.0.1:8000/users/";
      if (isAll) urlBase += "logoutAll";
      else urlBase += "logout";

      const fetchedData = await axios.get(urlBase, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      dispatch(authActions.logout({ user: fetchedData.data.user }));

      removeAuthToken();
      router.navigate("/login");
    } catch (error) {
      console.log("Can not logout!");
    }
  };
};
