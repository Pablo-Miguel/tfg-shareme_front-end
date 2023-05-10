import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

import useHttp from "../hooks/useHttp";
import { useEffect } from "react";
import { getAuthToken } from "../utils/storage";

const CreateCollectionPage = () => {
    const loader = useRouteLoaderData("collection-stuff-details");
    const { isLoading: isLoadingStuff, sendRequest: fetchMoreStuff } = useHttp();
    const { isLoading, error, sendRequest: addNewCollection } = useHttp();
    const [ viewMoreCont, setViewMoreCont ] = useState(0);
    const [ viewMore, setViewMore ] = useState(false);
    const [ collectionStuff, setCollectionStuff ] = useState(null);
    const [ success, setSuccess ] = useState(false);
    const [ searchBarValue, setSearchBarValue ] = useState('');

    useEffect(() => {

        if(loader){
            setCollectionStuff(loader.collectionStuff);
            setViewMore(loader.collectionStuff.total <= (viewMoreCont + 1) * 10);
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loader]);

    const fetchStuffHandler = (text_searched) => {
    
        let url_base = 'http://127.0.0.1:8000/stuff?isMine=true';
        
        if(text_searched && text_searched !== '') {
            url_base += `&text_searched=${text_searched}`;
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
    }, [viewMoreCont, searchBarValue]);

    const onClickViewMoreHandler = () => {
        setViewMoreCont((prevState) => prevState + 1);
    };

    const onChangeSearchBarHandler = (event) => {
        setSearchBarValue(event.target.value);
    };

    const onClickCreateCollectionHandler = (event) => {
        event.preventDefault();
        const collectionName = event.target.parentNode.childNodes[2].value;
        const collectionDescription = event.target.parentNode.childNodes[7].value;
        const stuff = [];
        const stuffCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        stuffCheckboxes.forEach((checkbox) => {
            if(checkbox.checked){
                stuff.push(checkbox.value);
            }
        });

        const collectionData = {
            title: collectionName,
            description: collectionDescription,
            stuff: stuff
        };

        addNewCollection({
            url: 'http://127.0.0.1:8000/collections',
            method: "POST",
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "Content-Type": "application/json"
            },
            body: collectionData
        }, (data) => {
            event.target.parentNode.childNodes[2].value = '';
            event.target.parentNode.childNodes[7].value = '';
            document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                checkbox.checked = false;
            });
            setSuccess(true);
        })
        
    };

    return (
        <div>
            <h1>Create Collection Page</h1>
            <form onBlur={() => setSuccess(false)}>
                <label htmlFor="collectionName">Collection Title</label>
                <br />
                <input type="text" id="collectionName" name="collectionName" />
                <br /><br />
                <label htmlFor="collectionDescription">Collection Description</label>
                <br />
                <input type="text" id="collectionDescription" name="collectionDescription" />
                <br /><br />
                {collectionStuff ?
                    <div>
                        <h2>Stuff</h2>
                        <label htmlFor="stuffSearch">Search</label>
                        <input type="text" id="stuffSearch" name="stuffSearch" onChange={onChangeSearchBarHandler}/>
                        <br /><br />
                        {collectionStuff.stuff.length > 0 ? 
                            collectionStuff.stuff.map((stuff) => (
                                <div key={stuff._id}>
                                    <input type="checkbox" id={stuff._id} name={stuff._id} value={stuff._id} />
                                    <label htmlFor={stuff._id}>{stuff.title}</label>
                                    <br />
                                </div>
                            ))
                        :
                            <h1>No stuff found</h1>
                        }
                        { isLoadingStuff && <p>Loading...</p>}
                        <br />
                        {!viewMore && 
                            <button type="button" onClick={onClickViewMoreHandler}>
                                View more
                            </button>
                        }
                        <br /><br />
                    </div>
                : 
                    <h1>Loading...</h1>
                }
                <button type="submit" onClick={onClickCreateCollectionHandler}>Create Collection</button>
                <br /><br />
                {
                    isLoading && <h1>Loading...</h1>
                }
                {
                    error && <h1>{error}</h1>
                }
                {
                    success && !error && !isLoading && <h1>Collection created successfully!</h1>
                }
            </form>
        </div>
    );
};

export default CreateCollectionPage;
