import { useRef } from "react";
import { Button, Input } from "@mui/joy";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
    const searchBarInputRef = useRef();

    const onClickHandler = () => {
        props.onSearch(searchBarInputRef.current.children[1].value);
    };

    const onChangeHandler = (event) => {
        props.onSearch(event.target.value);
    };

    return (
        <Input
            startDecorator={<SearchIcon />}
            endDecorator={<Button onClick={onClickHandler}>Search</Button>}
            placeholder={props.placeholder ? props.placeholder : "Search for stuff..."}
            onChange={onChangeHandler}
            fullWidth={true}
            ref={searchBarInputRef}
        />
    );
};

export default SearchBar;