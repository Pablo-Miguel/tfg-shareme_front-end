import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchStuff } from "../store/stuff-store/stuff-actions";

const useStuff = () => {
  const stuff = useSelector((state) => state.stuff.stuff);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stuff) {
      dispatch(fetchStuff());
    }
  }, [dispatch, stuff]);

  return stuff;
};

export default useStuff;
