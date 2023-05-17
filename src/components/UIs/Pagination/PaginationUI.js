import { Pagination } from "@mui/material";

const PaginationUI = (props) => {

    return (
        <Pagination
            count={props.count}
            page={props.page}
            onChange={props.onChange}
            sx={{ margin: 5 }}
            color="primary"
            size="large"
        />
    );
};

export default PaginationUI;