import React, { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

import { Grid } from "@mui/material";

import CreateCollectionForm from "../components/CreateCollectionForm/CreateCollectionForm";
import { getAuthToken } from "../utils/storage";
import useHttp from "../hooks/useHttp";
import Alert from "../components/Alert/Alert";
import TitleWrapper from "../components/UIs/TitleWrapper.js/TitleWrapper";

import { CATEGORIES_ALL } from "../Global";

const EditCollectionPage = () => {
    const loader = useRouteLoaderData("edit-collection");
    const { error, isLoading, sendRequest: fetchEditCollection } = useHttp();
    const { isLoading: isLoadingStuff, sendRequest: fetchMoreStuff } = useHttp();
    const [ viewMoreCont, setViewMoreCont ] = useState(0);
    const [ viewMore, setViewMore ] = useState(false);
    const [ collectionStuff, setCollectionStuff ] = useState(null);
    const [ searchBarValue, setSearchBarValue ] = useState('');
    const [ category, setCategory ] = useState('All');
    const [initialStuff, setInitialStuff] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error && error !== '') {
            setOpen(true);
        }
    }, [error]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setOpen(false);
    };

    useEffect(() => {

        if(loader){
            setInitialStuff(loader.collection.stuff.map((stuff) => {
                return stuff._id;
            }));
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loader]);

    const fetchStuffHandler = (text_searched) => {
    
        let url_base = `${process.env.REACT_APP_BACKEND_BASE_URL}/stuff?isMine=true`;
        
        if(text_searched && text_searched !== '') {
            url_base += `&text_searched=${text_searched}`;
        }

        if(category && category !== 'All') {
            url_base += `&category=${category}`;
        }

        url_base += `&limit=${(viewMoreCont * 10) + 10}`;
        url_base += '&sortBy=createdAt:desc';

        fetchMoreStuff({
            url: url_base,
            method: "GET",
            headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            }
        }, (data) => {

            setCollectionStuff({
                stuff: data.stuff ? data.stuff : [],
                total: data.total
            });
    
            setViewMore(data.total <= (viewMoreCont + 1) * 10);
    
        });
    };

    useEffect(() => {

        fetchStuffHandler(searchBarValue);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewMoreCont, searchBarValue, category]);

    const onClickViewMoreHandler = () => {
        setViewMoreCont((prevState) => prevState + 1);
    };

    const onChangeSearchBarHandler = (value) => {
        setSearchBarValue(value);
    };

    const categoriesOnChangeHandler = (event) => {
        setCategory(event.target.innerText);
    };

    const editCollectionHandler = (event) => {
    
        fetchEditCollection(
            {
                url: `${process.env.REACT_APP_BACKEND_BASE_URL}/collections/${loader.collection._id}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    "Content-Type": "application/json"
                },
                body: {
                    title: event.data.title,
                    description: event.data.description,
                    stuff: event.data.stuff
                }
            },
            (data) => {

                setOpen(true);
            
            }
        );

    };


    return (
        <>
            <Grid container spacing={3} padding={2}>
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8} container>

                    <TitleWrapper title="Edit collection" />

                    <Grid item xs={12}>
                        <CreateCollectionForm 
                            initialStuff={initialStuff}
                            initialCollection={loader.collection}
                            collectionStuff={collectionStuff} 
                            isLoading={isLoading}
                            isLoadingStuff={isLoadingStuff}
                            onSearchStuff={onChangeSearchBarHandler}
                            viewMore={viewMore}
                            onClickViewMore={onClickViewMoreHandler}
                            onSubmit={editCollectionHandler}
                            categories={CATEGORIES_ALL}
                            categoriesOnChange={categoriesOnChangeHandler}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
            {open && !error ? (
                <Alert severity="success" open={open} handleClose={handleClose} message="Your stuff has been updated successfully!" />
            )
            : (
                <Alert severity="error" open={open} handleClose={handleClose} message={error} />
            )}
        </>
    );
};

export default EditCollectionPage;