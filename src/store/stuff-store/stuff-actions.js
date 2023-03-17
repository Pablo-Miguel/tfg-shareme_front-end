import axios from "axios";

import { getAuthToken } from "../../utils/storage";
import { stuffActions } from "./stuff-slice";

export const fetchStuff = (page_number = 0, text_searched = "") => {
  return async (dispatch) => {
    try {
      dispatch(stuffActions.setError(null));
      dispatch(stuffActions.setIsLoading(true));

      let url_base = "http://127.0.0.1:8000/stuff?";
      if (page_number === 0) {
        url_base += "skip=0";
      } else {
        url_base += `skip=${page_number * 10 + 1}`;
      }

      if (text_searched !== "") {
        url_base += `&text_searched=${text_searched}`;
      }

      const fetchedStaff = await axios.get(url_base, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (fetchedStaff.data.length === 0) {
        dispatch(
          stuffActions.setError({
            message: "No stuff found",
            status: 404,
          })
        );
        return;
      }

      dispatch(stuffActions.setIsLoading(false));
      dispatch(stuffActions.setStuff(fetchedStaff.data.stuff));
      dispatch(stuffActions.setTotal(fetchedStaff.data.total));
    } catch (error) {
      dispatch(
        stuffActions.setError({
          message: "Error fetching stuff",
          status: 404,
        })
      );

      dispatch(stuffActions.setStuff([]));
      dispatch(stuffActions.setTotal(0));
    }
  };
};
