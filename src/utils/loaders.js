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

  url_base += '&sortBy=createdAt:desc';

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

export const fetchUserCollections = async (user_id, isMe) => {

  let url_base = 'http://127.0.0.1:8000/collections?';

  if (!isMe) {
    url_base += `other_user_id=${user_id}`;
  } else {
    url_base += `isMine=${isMe}`;
  }

  url_base += '&sortBy=createdAt:desc';

  const response = await axios.get(url_base, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    }
  });

  if (response.statusText !== "OK") {
    throw json(
      { message: "Could not fetch the user collections!" },
      {
        status: 500,
      }
    );
  }
  
  return response.data;

};


export const getUserByIdLoader = async ({ request, params }) => {
  const isMe = params.user_id === getUserId();
  const id = params.user_id;

  return defer({
    isMe: isMe,
    user: await fetchUserById(id),
    userStuff: await fetchUserStuff(id, isMe),
    userCollections: await fetchUserCollections(id, isMe),
  });
};

export const getCollectionStuffLoader = async ({ request, params }) => {
  return defer({
    collectionStuff: await fetchUserStuff(null, true),
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

export const getCollectionByIdLoader = async ({ request, params }) => {
  const response = await axios.get(`http://127.0.0.1:8000/collections/${params.collection_id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    }
  });

  if (response.status === 404) {
    throw json(
      { message: "Collection not found!" },
      {
        status: 404,
      }
    );
  }

  if (response.statusText !== "OK") {
    throw json(
      { message: "Could not fetch the collection!" },
      {
        status: 500,
      }
    );
  }

  const data = await response.data;

  return defer({
    collection: data,
  });
};

export const getUsersLoader = async ({ request, params }) => {
  
  const response = await axios.get(`http://127.0.0.1:8000/users?sortBy=followers:desc`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    }
  });

  if (response.statusText !== "OK") {
    throw json(
      { message: "Could not fetch the users!" },
      {
        status: 500,
      }
    );
  }

  const data = await response.data;

  return defer({
    users: data.users,
    total: data.total
  });
};
