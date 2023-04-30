import axios from "axios";
import { defer, json, redirect } from "react-router-dom";

import { getAuthToken, getUserId } from "./storage";

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

const fetchUserStuff = async (user_id, isMe) => {

  let url_base = 'http://127.0.0.1:8000/stuff?';

  if (!isMe) {
    url_base += `other_user_id=${user_id}`;
  } else {
    url_base += `isMine=${isMe}`;
  }

  url_base += '&sortBy=updatedAt:desc';

  const response = await axios.get(url_base, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    }
  });

  if (response.statusText !== "OK") {
    throw json(
      { message: "Could not fetch the user stuff!" },
      {
        status: 500,
      }
    );
  }
  
  return response.data;

};


export const getUserByIdLoader = async ({ request, params }) => {
  const isMe = params.user_id == getUserId();
  const id = params.user_id;

  return defer({
    isMe: isMe,
    user: await fetchUserById(id),
    userStuff: await fetchUserStuff(id, isMe),
  });
};


export const getStuffByIdLoader = async ({ request, params }) => {
  const response = await axios.get(`http://127.0.0.1:8000/stuff/${params.stuff_id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    }
  });

  if (response.status === 404) {
    throw json(
      { message: "Stuff not found!" },
      {
        status: 404,
      }
    );
  }

  if (response.statusText !== "OK") {
    throw json(
      { message: "Could not fetch the stuff!" },
      {
        status: 500,
      }
    );
  }

  const data = await response.data;

  return defer({
    stuff: data.stuff,
    isLiked: data.isLiked
  });
};
