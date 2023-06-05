import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";

import CollectionList from "../components/CollectionList/CollectionList";


const SearchCollectionsPage = () => {
    const loader = useRouteLoaderData("search-collections");

    return (
        <>
            <Grid container spacing={3} padding={2}>
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8} container>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h4" style={{ fontWeight: "bold", marginBottom: 10 }}>
                            Search Collections
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                    </Grid>

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