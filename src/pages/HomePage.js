import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/joy";
import { Grid, Typography } from "@mui/material";

import { fetchStuff } from "../store/stuff-store/stuff-actions";
import StuffCard from "../components/StuffCard/StuffCard";
import PaginationUI from "../components/UIs/Pagination/PaginationUI";
import Spinner from "../components/Spinner/Spinner";
import SearchBar from "../components/UIs/SearchBar/SearchBar";

const HomePage = () => {
  const [ searchBarValue, setSearchBarValue ] = useState("");
  const stuff = useSelector((state) => state.stuff);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStuff());
  }, [dispatch]);

  const searchBarHandler = (value) => {
    setSearchBarValue(value);
    dispatch(fetchStuff(0, value));
  };

  const onChangePaginationHandler = (event, page) => {
    dispatch(fetchStuff(page - 1, searchBarValue));
  };

  return (
    <Grid container spacing={1} padding={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" style={{ fontWeight: "bold" }}>
          Home Page
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchBar onSearch={searchBarHandler} />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {!stuff.isLoading && (
        <>
          {stuff.total === 0 && (
            <Grid item xs={12} container justifyContent="center" display="flex">
              <Typography variant="h5" component="h5" style={{ fontWeight: "bold", marginTop: 100 }}>
                No stuff found yet!
              </Typography>
            </Grid>
          )}
          {stuff.stuff.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item._id} container justifyContent="center">
              <StuffCard
                id={item._id}
                stuff={item}
              />
            </Grid>
          ))}
          {Math.ceil(stuff.total / stuff.limit) > 1 && (
            <Grid item xs={12} container justifyContent="center">
              <PaginationUI page={stuff.page + 1} count={Math.ceil(stuff.total / stuff.limit)} onChange={onChangePaginationHandler} />
            </Grid>
          )}
        </>
      )}
      {stuff.isLoading && !stuff.error && (
        <Grid item xs={12}>
          <Spinner />
        </Grid>
      )}
      {stuff.error && (
        <Grid item xs={12} container justifyContent="center">
          <Typography variant="h5" component="h5" style={{ fontWeight: "bold", marginTop: 100 }}>
            Error: {stuff.error.status} - {stuff.error.message}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default HomePage;
