import { Grid, Typography } from "@mui/material";

import StuffCard from "../StuffCard/StuffCard";
import SearchBar from "../UIs/SearchBar/SearchBar";
import Spinner from "../Spinner/Spinner";
import useHttp from "../../hooks/useHttp";
import { getAuthToken } from "../../utils/storage";
import PaginationUI from "../UIs/Pagination/PaginationUI";
import { useState } from "react";

const LIMIT = 10;

const StuffList = ({ stuff, total, isMe, user_id, setFrontUser }) => {
    const [ page, setPage ] = useState(0);
    const [ textSearched, setTextSearched ] = useState("");
    const { isLoading, sendRequest: fetchStuff } = useHttp();

    const fetchSearchedStuff = (text_searched, cntPage) => {

        let url_base = `${process.env.REACT_APP_BACKEND_BASE_URL}/stuff?`;

        if (!isMe) {
            url_base += `other_user_id=${user_id}`;
        } else {
            url_base += `isMine=${isMe}`;
        }

        if (text_searched && text_searched !== "") {
            url_base += `&text_searched=${text_searched}`;
        }

        url_base += `&limit=10`;
        url_base += `&skip=${cntPage * LIMIT}`;
        url_base += '&sortBy=createdAt:desc';

        fetchStuff({
            url: url_base,
            method: "GET",
            headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            }
        }, (data) => {

            setFrontUser((prevState) => ({
                ...prevState,
                stuff: data.stuff,
                total_stuff: data.total
            }));

        });

        setTextSearched(text_searched);
        setPage(cntPage);

    };

    const onSearchHandler = (text_searched) => {
        fetchSearchedStuff(text_searched, page);
    };

    const onChangePaginationHandler = (event, page) => {
        setPage(page - 1);
        fetchSearchedStuff(textSearched, page - 1);
    };

    return (
        <Grid container style={{ marginTop: 20 }}>
            <SearchBar onSearch={onSearchHandler}/>
            {
                !isLoading ? (
                    <>
                        { (total === 0 || stuff.length === 0) && 
                            <Grid item xs={12} container justifyContent="center" display="flex">
                                <Typography variant="h5" component="h5" style={{ fontWeight: "bold", marginTop: 100 }}>
                                    No stuff found yet!
                                </Typography>
                            </Grid>
                        }
                        {stuff.map((item) => (
                            <Grid item container xs={12} md={6} lg={6} key={item._id} justifyContent="center">
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
              <Grid item xs={12} container justifyContent="center">
                <PaginationUI page={page + 1} count={Math.ceil(total / LIMIT)} onChange={onChangePaginationHandler} />
              </Grid>
            )}
        </Grid>
    )
};

export default StuffList;