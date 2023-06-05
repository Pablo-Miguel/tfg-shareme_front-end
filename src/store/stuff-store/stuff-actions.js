import axios from "axios";

import { getAuthToken } from "../../utils/storage";
import { stuffActions } from "./stuff-slice";

export const fetchStuff = (page_number = 0, text_searched = "", category = "All") => {
  return async (dispatch) => {
    try {
      dispatch(stuffActions.setError(null));
      dispatch(stuffActions.setIsLoading(true));

      let url_base = `${process.env.REACT_APP_BACKEND_BASE_URL}/stuff?`;
      if (page_number === 0) {
        url_base += "skip=0";
      } else {
        url_base += `skip=${page_number * 10}`;
      }

      if (text_searched !== "") {
        url_base += `&text_searched=${text_searched}`;
      }

      if (category !== "All") {
        url_base += `&category=${category}`;
      }
      
      url_base += '&sortBy=createdAt:desc';

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
      dispatch(stuffActions.setPage(page_number));
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

export const likeStuff = (stuff_id) => {
  return async (dispatch) => {
    try {
      dispatch(stuffActions.setError(null));

      const fetchedStuff = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/stuff/${stuff_id}/like`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      
      dispatch(stuffActions.likeStuff(fetchedStuff.data));
    } catch (error) {
      dispatch(
        stuffActions.setError({
          message: "Error liking stuff",
          status: 404,
        })
      );
    }
  };
};

export const unlikeStuff = (stuff_id) => {
  return async (dispatch) => {
    try {
      dispatch(stuffActions.setError(null));

      const fetchedStuff = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/stuff/${stuff_id}/unlike`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      dispatch(stuffActions.unlikeStuff(fetchedStuff.data));
    } catch (error) {
      dispatch(
        stuffActions.setError({
          message: "Error unliking stuff",
          status: 404,
        })
      );
    }
  };
};

export const viewStuff = (stuff_id) => {
  return async (dispatch) => {
    try {
      dispatch(stuffActions.setError(null));
      dispatch(stuffActions.setIsLoading(true));

      const fetchedStuff = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/stuff/${stuff_id}/view`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      dispatch(stuffActions.setIsLoading(false));
      dispatch(stuffActions.viewStuff(fetchedStuff.data));
    } catch (error) {
      dispatch(stuffActions.setIsLoading(false));
      dispatch(
        stuffActions.setError({
          message: "Error viewing stuff",
          status: 404,
        })
      );
    }
  };
};
