import axios from "axios";
import { defer, json, redirect } from "react-router-dom";

import { getAuthToken } from "./storage";

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  return null;
};

export const checkUnauthLoader = () => {
  const token = getAuthToken();

  if (token) {
    return redirect("/");
  }

  return null;
};

const fetchUserById = async (user_id) => {
  const response = await axios.get(`http://127.0.0.1:8000/users/${user_id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    }
  });

  if (response.status === 404) {
    throw json(
      { message: "User not found!" },
      {
        status: 404,
      }
    );
  }

  if (response.statusText !== "OK") {
    throw json(
      { message: "Could not fetch the user!" },
      {
        status: 500,
      }
    );
  }

  const data = await response.data;

  return data;
};

export const getUserByIdLoader = async ({ request, params }) => {
  const id = params.user_id;

  return defer({
    user: await fetchUserById(id),
  });
};
