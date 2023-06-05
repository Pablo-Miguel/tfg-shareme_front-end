import { useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";

import { Divider, Grid, Typography as TypographyMUI } from "@mui/material";

import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import CreateCollectionForm from "../components/CreateCollectionForm/CreateCollectionForm";
import Alert from "../components/Alert/Alert";

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

const CreateCollectionPage = () => {
    const loader = useRouteLoaderData("collection-stuff-details");
    const { isLoading: isLoadingStuff, sendRequest: fetchMoreStuff } = useHttp();
    const { isLoading, error, sendRequest: addNewCollection } = useHttp();
    const [ viewMoreCont, setViewMoreCont ] = useState(0);
    const [ viewMore, setViewMore ] = useState(false);
    const [ collectionStuff, setCollectionStuff ] = useState(null);
    const [ searchBarValue, setSearchBarValue ] = useState('');
    const [ category, setCategory ] = useState('All');
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
            setCollectionStuff(loader.collectionStuff);
            setViewMore(loader.collectionStuff.total <= (viewMoreCont + 1) * 10);
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

    const createCollectionHandler = (event) => {

        addNewCollection({
            url: `${process.env.REACT_APP_BACKEND_BASE_URL}/collections`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "Content-Type": "application/json"
            },
            body: {
                title: event.data.title,
                description: event.data.description,
                stuff: event.data.stuff
            }
        }, (data) => {
            
            event.clearForm();
            setOpen(true);

        })
        
    };

    return (
        <>
            <Grid container spacing={3} padding={2}>
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8} container>
                    <Grid item xs={12}>
                        <TypographyMUI variant="h4" component="h4" style={{ fontWeight: "bold"}}>
                            Create new collection
                        </TypographyMUI>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                    </Grid>

                    <Grid item xs={12}>
                        <CreateCollectionForm 
                            collectionStuff={collectionStuff} 
                            isLoading={isLoading}
                            isLoadingStuff={isLoadingStuff} 
                            onSearchStuff={onChangeSearchBarHandler}
                            viewMore={viewMore}
                            onClickViewMore={onClickViewMoreHandler}
                            onSubmit={createCollectionHandler}
                            categories={categories}
                            categoriesOnChange={categoriesOnChangeHandler}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
            {open && !error ? (
                <Alert severity="success" open={open} handleClose={handleClose} message="Your stuff collection has been created successfully!" />
            )
            : (
                <Alert severity="error" open={open} handleClose={handleClose} message={error} />
            )}
        </>
    );
};

export default CreateCollectionPage;
