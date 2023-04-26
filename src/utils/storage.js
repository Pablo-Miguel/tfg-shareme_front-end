export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return token;
};

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

export const getUserId = () => {
  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    return null;
  }

  return user_id;
};

export const setUserId = (user_id) => {
  localStorage.setItem("user_id", user_id);
}

export const removeUserId = () => {
  localStorage.removeItem("user_id");
}
