import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";

import StuffCard from "../StuffCard/StuffCard";
import SearchBar from "../UIs/SearchBar/SearchBar";
import PaginationUI from "../UIs/Pagination/PaginationUI";
import SelectFormControl from "../UIs/SelectFormControl/SelectFormControl";
import Spinner from "../Spinner/Spinner";
import useHttp from "../../hooks/useHttp";
import { getAuthToken } from "../../utils/storage";

import classes from "./StuffList.module.css";

import { LIMIT, CATEGORIES_ALL } from "../../Global";

const StuffList = ({ stuff, total, isMe, user_id, setFrontUser, setData, url_base }) => {
    const [ page, setPage ] = useState(0);
    const [ textSearched, setTextSearched ] = useState("");
    const [ category, setCategory ] = useState("All");
    const { isLoading, sendRequest: fetchStuff } = useHttp();

    const fetchSearchedStuff = (text_searched, cntPage, category) => {
        
        let urlBase = url_base ? url_base : `${process.env.REACT_APP_BACKEND_BASE_URL}/stuff?`;

        urlBase += `isMine=${isMe}`;

        if(category && category !== "All") {
            urlBase += `&category=${category}`;
        }

        if (text_searched && text_searched !== "") {
            urlBase += `&text_searched=${text_searched}`;
        }
        
        urlBase += `&limit=10`;
        urlBase += `&skip=${cntPage * LIMIT}`;

        if (!isMe) {
            urlBase += `other_user_id=${user_id}`;
        }

        if (text_searched && text_searched !== "") {
            urlBase += `&text_searched=${text_searched}`;
        }
        
        urlBase += '&sortBy=createdAt:desc';

        fetchStuff({
            url: urlBase,
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            }
        }, (data) => {

            if(setFrontUser){
                setFrontUser((prevState) => ({
                    ...prevState,
                    stuff: data.stuff,
                    total_stuff: data.total
                }));
            } else {
                setData(data);
            }

        });

        setTextSearched(text_searched);
        setPage(cntPage);
        setCategory(category);

    };

    const onSearchHandler = (text_searched) => {
        fetchSearchedStuff(text_searched, page, category);
    };

    const onChangePaginationHandler = (event, page) => {
        setPage(page - 1);
        fetchSearchedStuff(textSearched, page - 1, category);
    };

    const categoriesOnChangeHandler = (event) => {
        fetchSearchedStuff(textSearched, page, event.target.innerText);
    };


    return (
        <Grid container className={classes.wrapperGrid}>
            <Grid item xs={12} container>
                <Grid item xs={12} md={8} lg={9} className={classes.wrapperOptions}>
                    <SearchBar onSearch={onSearchHandler}/>
                </Grid>
                <Grid item xs={12} md={4} lg={3} className={classes.wrapperOptions}>
                    <SelectFormControl
                        options={CATEGORIES_ALL}
                        placeholder="Select category…"
                        name="category"
                        initialValue={"All"}
                        onChange={categoriesOnChangeHandler}
                    />
                </Grid>
            </Grid>
            {
                !isLoading ? (
                    <>
                        { (total === 0 || stuff.length === 0) && 
                            <Grid item xs={12} container className={`${classes.container} ${classes.noStuffCont}`}>
                                <Typography variant="h5" component="h5" className={classes.text}>
                                    No stuff found yet!
                                </Typography>
                            </Grid>
                        }
                        {stuff.map((item) => (
                            <Grid item container xs={12} md={6} lg={6} key={item._id} className={classes.container}>
                                <StuffCard
                                    id={item._id}
                                    stuff={item}
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
              <Grid item xs={12} container className={classes.container}>
                <PaginationUI page={page + 1} count={Math.ceil(total / LIMIT)} onChange={onChangePaginationHandler} />
              </Grid>
            )}
        </Grid>
    )
};

export default StuffList;