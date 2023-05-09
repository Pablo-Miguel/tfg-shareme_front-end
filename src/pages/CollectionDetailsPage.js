import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import StuffCard from "../components/StuffCard/StuffCard";

const CollectionDetailsPage = () => {
    const loader = useRouteLoaderData("collection-details");
    const [ collection ] = useState(loader.collection); 

    return (
        <div>
            <h1>Collection Details Page</h1>
            {collection ?
                <div>
                    <div>
                        <h2>{collection.title}</h2>
                        <h3>{collection.description}</h3>
                        <h4>Owner: {collection.owner.nickName}</h4>
                        { collection.stuff.length > 0 ?
                            collection.stuff.map((item) => (
                                <StuffCard
                                    key={item._id}
                                    id={item._id}
                                    title={item.title}
                                    price={item.price}
                                    img={item.image}
                                    views={item.views}
                                    likes={item.likes}
                                    category={item.category}
                                    owner={item.owner.nickName}
                                    has_offer={item.has_offer}
                                    offer_price={item.offer_price}
                                    isLiked={item.isLiked}
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
