import React from "react";
import { useRouteLoaderData } from "react-router-dom";

import { Grid } from "@mui/material";

import CollectionList from "../components/CollectionList/CollectionList";
import TitleWrapper from "../components/UIs/TitleWrapper.js/TitleWrapper";

const SearchCollectionsPage = () => {
    const loader = useRouteLoaderData("search-collections");

    return (
        <>
            <Grid container spacing={3} padding={2}>
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8} container>

                    <TitleWrapper title="Search Collections" />

                    <Grid item xs={12}>
                        <CollectionList 
                            collections={loader.collections}
                            total={loader.total}
                            isMe={false}
                            isGlobal={true}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
        </>
    );
};

export default SearchCollectionsPage;