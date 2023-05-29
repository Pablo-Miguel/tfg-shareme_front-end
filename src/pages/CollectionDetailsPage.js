import React, { useEffect, useRef, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

import StuffCard from "../components/StuffCard/StuffCard";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";

const CollectionDetailsPage = () => {
    const loader = useRouteLoaderData("collection-details");
    const [ collection, setCollection ] = useState(loader.collection); 
    const effectExecutedRef = useRef(false);
    const { sendRequest: sendCollectionView } = useHttp();

    useEffect(() => {
        if (!loader || effectExecutedRef.current) {
            return;
        }

        effectExecutedRef.current = true;

        sendCollectionView(
            {
                url: `${process.env.REACT_APP_BACKEND_BASE_URL}/collections/${collection._id}/view`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            },
            (data) => {
                setCollection((prevState) => ({
                    ...prevState,
                    views: data.views
                }));
            }

        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Collection Details Page</h1>
            {collection ?
                <div>
                    <div>
                        <h2>{collection.title}</h2>
                        <h3>{collection.description}</h3>
                        <h4>Views: {collection.views}</h4>
                        <h4>Owner: {collection.owner.nickName}</h4>
                        { collection.stuff.length > 0 ?
                            collection.stuff.map((item) => (
                                <StuffCard
                                    key={item._id}
                                    id={item._id}
                                    stuff={item}
                                />
                            ))
                        :
                            <h1>This collection hasn't have stuff jet</h1>
                        }
                    </div>
                    {/* <div>
                        <h3>Delete stuff</h3>
                        <form>
                            {collection.stuff.length > 0 ? 
                                collection.stuff.map((stuff) => (
                                    <div key={stuff._id}>
                                        <input type="checkbox" id={stuff._id} name={stuff._id} value={stuff._id} />
                                        <label htmlFor={stuff._id}>{stuff.title}</label>
                                        <br />
                                    </div>
                                ))
                            :
                                <h1>No stuff found</h1>
                            }
                        </form>
                    </div> */}
                </div>
            :
                <h2>Loading...</h2>
            }
        </div>
    );
};

export default CollectionDetailsPage;
