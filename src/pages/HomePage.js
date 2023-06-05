import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/joy";
import { Grid, Typography } from "@mui/material";

import { fetchStuff } from "../store/stuff-store/stuff-actions";
import StuffCard from "../components/StuffCard/StuffCard";
import PaginationUI from "../components/UIs/Pagination/PaginationUI";
import Spinner from "../components/Spinner/Spinner";
import SearchBar from "../components/UIs/SearchBar/SearchBar";
import SelectFormControl from "../components/UIs/SelectFormControl/SelectFormControl";

const categories = [
  "All",
  "Music",
  "Photography",
  "Technology",
  "Clothes",
  "Kitchen",
  "Sports",
  "Decoration",
  "Books",
  "Other"
];

const HomePage = () => {
  const [ searchBarValue, setSearchBarValue ] = useState("");
  const [ category, setCategory ] = useState('All');
  const stuff = useSelector((state) => state.stuff);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStuff());
  }, [dispatch]);

  const searchBarHandler = (value) => {
    setSearchBarValue(value);
    dispatch(fetchStuff(0, value, category));
  };

  const onChangePaginationHandler = (event, page) => {
    dispatch(fetchStuff(page - 1, searchBarValue, category));
  };

  const onChangeCategoryHandler = (event) => {
    setCategory(event.target.innerText);
    dispatch(fetchStuff(0, searchBarValue, event.target.innerText));
  };

  return (
    <Grid container spacing={1} padding={2}>
      <Grid item xs={0} md={1} lg={2}></Grid>
      <Grid item xs={12} md={10} lg={8} container>
        <Grid item xs={12}>
          <Typography variant="h4" component="h4" style={{ fontWeight: "bold", marginBottom: 10 }}>
            Home Page
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container xs={12}>
              <Grid item xs={12} md={8} lg={9} style={{ padding: 5 }}>
                  <SearchBar onSearch={searchBarHandler}/>
              </Grid>
              <Grid item xs={12} md={4} lg={3} style={{ padding: 5 }}>
                  <SelectFormControl
                      options={categories}
                      placeholder="Select category…"
                      name="category"
                      initialValue={"All"}
                      onChange={onChangeCategoryHandler}
                  />
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
              <Grid item xs={12} md={6} lg={6} key={item._id} container justifyContent="center">
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
      <Grid item xs={0} md={1} lg={2}></Grid>
    </Grid>
  );
};

export default HomePage;
