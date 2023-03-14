import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkAuth } from "../store/auth-store/auth-actions";

const useUser = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(checkAuth());
    }
  }, [dispatch, user]);

  return user;
};

export default useUser;
