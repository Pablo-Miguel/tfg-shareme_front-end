import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";

import SearchBar from "../UIs/SearchBar/SearchBar";
import Spinner from "../Spinner/Spinner";
import useHttp from "../../hooks/useHttp";
import { getAuthToken } from "../../utils/storage";
import PaginationUI from "../UIs/Pagination/PaginationUI";
import CollectionCard from "../CollectionCard/CollectionCard";

import classes from "./CollectionList.module.css";

import { LIMIT } from "../../Global";

const CollectionList = ({ collections: initCollections, total: initTotal, isMe, user_id, setFrontUser, isGlobal }) => {
    const [ collections, setCollections ] = useState(initCollections);
    const [ total, setTotal ] = useState(initTotal);
    const [ page, setPage ] = useState(0);
    const [ textSearched, setTextSearched ] = useState("");
    const { isLoading, sendRequest: fetchCollections } = useHttp();

    const fetchSearchedCollections = (text_searched, cntPage) => {

        let url_base = `${process.env.REACT_APP_BACKEND_BASE_URL}/collections?`;

        if (!isMe && !isGlobal) {
            url_base += `other_user_id=${user_id}`;
        } else if (isMe) {
            url_base += `isMine=${isMe}`;
        }

        if (text_searched && text_searched !== "") {
            url_base += `&text_searched=${text_searched}`;
        }

        url_base += `&limit=10`;
        url_base += `&skip=${cntPage * LIMIT}`;
        url_base += '&sortBy=createdAt:desc';

        fetchCollections({
            url: url_base,
            method: "GET",
            headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            }
        }, (data) => {

            if(setFrontUser){
                setFrontUser((prevState) => ({
                    ...prevState,
                    collections: data.collections,
                    total_collections: data.total
                }));
            }
            
            setCollections(data.collections);
            setTotal(data.total);

        });

        setTextSearched(text_searched);
        setPage(cntPage);

    };

    const onSearchHandler = (text_searched) => {
        fetchSearchedCollections(text_searched, page);
    };

    const onChangePaginationHandler = (event, page) => {
        setPage(page - 1);
        fetchSearchedCollections(textSearched, page - 1);
    };
    
    return (
        <Grid container style={{ marginTop: 20 }}>
            <SearchBar onSearch={onSearchHandler}/>
            {
                !isLoading ? (
                    <>
                        { (total === 0 || collections.length === 0) && 
                            <Grid item xs={12} container className={classes.noCollectionContent}>
                                <Typography variant="h5" component="h5" className={classes.text}>
                                    No collections found yet!
                                </Typography>
                            </Grid>
                        }
                        {collections.map((item) => (
                            <Grid item container xs={12} md={6} lg={6} key={item._id} className={classes.content}>
                                <CollectionCard 
                                    id={item._id} 
                                    collection={item} 
                                    isMine={isMe} 
                                />
                            </Grid>
                        ))}
                    </>
                ) : (
                    <Grid item xs={12}>
                        <Spinner />
                    </Grid>
                )
                
            }
            {Math.ceil(total / LIMIT) > 1 && (
              <Grid item xs={12} container className={classes.content}>
                <PaginationUI page={page + 1} count={Math.ceil(total / LIMIT)} onChange={onChangePaginationHandler} />
              </Grid>
            )}
        </Grid>
    )
};

export default CollectionList;