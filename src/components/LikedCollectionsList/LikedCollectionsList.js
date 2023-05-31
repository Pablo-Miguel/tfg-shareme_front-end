import React, { useState } from 'react';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { Grid, Typography } from '@mui/material';

import FormButton from '../UIs/FormButton/FormButton';
import { getAuthToken } from '../../utils/storage';
import useHttp from '../../hooks/useHttp';
import CollectionCard from '../CollectionCard/CollectionCard';

const LikedCollectionsList = ({ likedCollections }) => {
    const [ viewMoreCont, setViewMoreCont ] = useState(0);
    const [ viewMore, setViewMore ] = useState(likedCollections.total <= (viewMoreCont + 1) * 10);
    const [ collections, setCollections ] = useState(likedCollections.collections);
    const { isLoading, sendRequest: fetchMoreCollections } = useHttp();

    const viewMoreHandler = () => {
        
        fetchMoreCollections({
            url: `${process.env.REACT_APP_BACKEND_BASE_URL}/users/me/likedCollections?skip=${(viewMoreCont + 1) * 10}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            }
        }, (data) => {

            setCollections((prevState) => {
                return prevState.concat(data.collections);
            });
            
            setViewMore(data.total <= (viewMoreCont + 2) * 10);
            setViewMoreCont((prevState) => prevState + 1);
        });

    };



    return (
        <>
            { collections.length > 0 && 
                <Grid container style={{ marginTop: 20 }}>
                    {collections.map((item) => (
                        <Grid item container xs={12} md={6} lg={6} key={item._id} justifyContent="center">
                            <CollectionCard 
                                id={item._id} 
                                collection={item} 
                                isMine={false} 
                            />
                        </Grid>
                    ))}
                    { !viewMore && 
                        <FormButton
                            text="View more"
                            isLoading={isLoading}
                            loadingPosition="start"
                            fullWidth={true}
                            startDecorator={<RemoveRedEyeRoundedIcon />}
                            onClick={viewMoreHandler}
                        />
                    }
                </Grid>
            }
            { collections.length <= 0 &&
                <Grid item xs={12} container justifyContent="center" display="flex">
                    <Typography variant="h5" component="h5" style={{ fontWeight: "bold", marginTop: 100 }}>
                        No liked collections!
                    </Typography>
                </Grid>
            }
        </>
    );
};

export default LikedCollectionsList;