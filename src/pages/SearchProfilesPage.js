import React, { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

import { Divider, Grid, Typography } from "@mui/material";

import useHttp from "../hooks/useHttp";
import SearchBar from "../components/UIs/SearchBar/SearchBar";
import Spinner from "../components/Spinner/Spinner";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import PaginationUI from "../components/UIs/Pagination/PaginationUI";

import { LIMIT } from "../Global";

const SearchProfilesPage = () => {
    const loader = useRouteLoaderData("search-profiles");
    const [ searchedUsers, setSearchedUsers ] = useState(loader);
    const [ pageCont, setPageCont ] = useState(0);
    const [ searchBarValue, setSearchBarValue ] = useState("");
    const { isLoading, sendRequest: fetchFilteredProfiles } = useHttp();

    const fetchProfilesHandler = (value, page) => {
        let url_base = `${process.env.REACT_APP_BACKEND_BASE_URL}/users?`;

        if (value) {
            url_base += `profileNameOrNickName=${value}`;
        }

        url_base += `&limit=${LIMIT}`;
        url_base += `&skip=${page * 10}`;
        url_base += `&sortBy=followers:desc`;

        fetchFilteredProfiles({
            url: url_base,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }, (data) => {
            setSearchedUsers(data);
        });

        setSearchBarValue(value);
        setPageCont(page);
    }

    const onChangeSearchBarHandler = (value) => {
        fetchProfilesHandler(value, pageCont);
    }

    const onChangePaginationHandler = (event, page) => {
        setPageCont(page - 1);
        fetchProfilesHandler(searchBarValue, page - 1);
    }

    return (
        <>
            <Grid container spacing={3} padding={2}>
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8} container>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h4" style={{ fontWeight: "bold", marginBottom: 10}}>
                            Search Profiles
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <SearchBar placeholder='Search some profiles...' onSearch={onChangeSearchBarHandler} />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                    </Grid>

                    <Grid item xs={12} container>
                        {
                            isLoading && (
                                <Grid item xs={12}>
                                    <Spinner />
                                </Grid>
                            )
                        }
                        { 
                            !isLoading && (
                                searchedUsers.users.map((user) => (
                                    <Grid item xs={12} md={6} container key={user._id} justifyContent="center">
                                        <ProfileCard user={user} />
                                    </Grid>
                                ))
                            )
                        }
                        {
                            searchedUsers.users.length === 0 && !isLoading && (
                                <Grid item xs={12} container justifyContent="center">
                                    <Typography variant="h5" component="h5" style={{ fontWeight: "bold", marginTop: 100 }}>
                                        No profiles found!
                                    </Typography>
                                </Grid>
                            )
                        }
                    </Grid>

                    <Grid item xs={12}>
                        {Math.ceil(searchedUsers.total / LIMIT) > 1 && (
                            <Grid item xs={12} container justifyContent="center">
                                <PaginationUI page={pageCont + 1} count={Math.ceil(searchedUsers.total / LIMIT)} onChange={onChangePaginationHandler} />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
        </>
    );
}

export default SearchProfilesPage;