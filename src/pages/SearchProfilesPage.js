import { useState } from "react";
import { useRouteLoaderData, useNavigate } from "react-router-dom";

import useHttp from "../hooks/useHttp";

const SearchProfilesPage = () => {
    const loader = useRouteLoaderData("search-profiles");
    const navigate = useNavigate();
    const [ searchedUsers, setSearchedUsers ] = useState(loader);
    const { isLoading, sendRequest: fetchFilteredProfiles } = useHttp();

    const onClickProfileHandler = (e) => {
        const userId = e.target.id;
        navigate(`/profile/${userId}`);
    }

    const onChangeSearchBarHandler = (e) => {
        let url_base = `${process.env.REACT_APP_BACKEND_BASE_URL}/users?`;

        if (e.target.value) {
            url_base += `profileNameOrNickName=${e.target.value}`;
        }

        url_base += `&limit=10`;
        url_base += `&skip=0`;
        url_base += `&sortBy=followers:desc`;

        fetchFilteredProfiles({
            url: url_base,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }, (data) => {
            setSearchedUsers(data);
        });

    }

    return (
        <div>
            <h1>Search Profiles</h1>
            <div className="search-bar"
                style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                        margin: '10px'
                    }
                }
            >
                <input style={
                    {
                        width: '100%',
                        padding: '10px',
                        margin: '10px',
                        borderRadius: '5px',
                        border: '1px solid black'
                    }
                } type="text" placeholder="Search..." onChange={onChangeSearchBarHandler} />
            </div>
            <div>
                {searchedUsers.users.map((user) => (
                    <div key={user._id}
                        id={user._id}
                        style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '10px',
                                margin: '10px'
                            }
                        }
                        onClick={onClickProfileHandler}
                    >
                        <div className="user-avatar">
                            <img src={user.avatar} alt={user.nickName} />
                        </div>
                        <h2>{user.nickName}</h2>
                        <p>{user.name}</p>
                        <hr />
                    </div>
                ))}
                {searchedUsers.users.length === 0 && <h1 style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                        margin: '10px'
                    }
                }>No users found</h1>}
                {
                    isLoading && <h1 style={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px',
                            margin: '10px'
                        }
                    }>Loading...</h1>
                }
            </div>
        </div>
    );
}

export default SearchProfilesPage;